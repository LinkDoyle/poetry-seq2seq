#!/usr/bin/env python
# coding: utf-8


import json

import tensorflow as tf

from poetry.data_utils import prepare_batch_predict_data
from poetry.model import Seq2SeqModel
from poetry.vocab import ints_to_sentence

from collections import namedtuple

_flags_names = ('rev_data',
                'align_data',
                'prev_data',
                'align_word2vec',
                'beam_width',
                'decode_batch_size',
                'max_decode_step',
                'write_n_best',
                'model_path',
                'model_dir',
                'predict_mode',
                'decode_input',
                'decode_output',
                'allow_soft_placement',
                'log_device_placement')

_flags_defaults = (
    True,
    True,
    True,
    True,
    1,
    80,
    500,
    False,
    None,
    None,
    'greedy',
    'data/newstest2012.bpe.de',
    'data/newstest2012.bpe.de.trans',
    True,
    False,
)
Flags = namedtuple('Flags', _flags_names, defaults=_flags_defaults)


class Seq2SeqPredictor:

    def __init__(self, flags: Flags):
        self.flags = flags
        # Load model config
        config = self._load_config()

        config_proto = tf.ConfigProto(
            allow_soft_placement=flags.allow_soft_placement,
            log_device_placement=flags.log_device_placement,
            gpu_options=tf.GPUOptions(allow_growth=True)
        )

        self.sess = tf.Session(config=config_proto)

        # Build the model
        self.model = Seq2SeqModel(config, 'predict')

        # Create saver
        # Using var_list = None returns the list of all saveable variables
        saver = tf.train.Saver(var_list=None)

        # Reload existing checkpoint
        self._load_model(self.sess, self.model, saver)

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.sess.close()

    def _load_config(self):
        if self.flags.model_path is not None:
            checkpoint_path = self.flags.model_path
            print('Model path specified at: {}'.format(checkpoint_path))
        elif self.flags.model_dir is not None:
            checkpoint_path = tf.train.latest_checkpoint(self.flags.model_dir + '/')
            print('Model dir specified, using the latest checkpoint at: {}'.format(checkpoint_path))
        else:
            checkpoint_path = tf.train.latest_checkpoint('model/')
            print('Model path not specified, using the latest checkpoint at: {}'.format(checkpoint_path))

        self.flags = self.flags._replace(model_path=checkpoint_path)

        # Load config saved with model
        with open('%s.json' % self.flags.model_path, 'r') as f:
            config = json.load(f)

        # Overwrite flags
        for k, v in self.flags._asdict().items():
            config[k] = v

        return config

    def _load_model(self, session, model, saver):
        if tf.train.checkpoint_exists(self.flags.model_path):
            print('Reloading model parameters..')
            model.restore(session, saver, self.flags.model_path)
        else:
            raise ValueError(
                'No such file:[{}]'.format(self.flags.model_path))
        return model

    def predict(self, keywords):
        sentences = []
        for keyword in keywords:
            source, source_len = prepare_batch_predict_data(keyword,
                                                            previous=sentences,
                                                            prev=self.flags.prev_data,
                                                            rev=self.flags.rev_data,
                                                            align=self.flags.align_data)

            predicted_batch = self.model.predict(
                self.sess,
                encoder_inputs=source,
                encoder_inputs_length=source_len
            )

            predicted_line = predicted_batch[0]  # predicted is a batch of one line
            predicted_line_clean = predicted_line[:-1]  # remove the end token
            predicted_ints = [x[0] for x in predicted_line_clean]  # Flatten from [time_step, 1] to [time_step]
            predicted_sentence = ints_to_sentence(predicted_ints)

            if self.flags.rev_data:
                predicted_sentence = predicted_sentence[::-1]

            sentences.append(predicted_sentence)
        return sentences


def main():
    KEYWORDS = [
        '人',
        '工',
        '智',
        '能'
    ]
    flags = Flags()
    with Seq2SeqPredictor(flags) as predictor:
        lines = predictor.predict(KEYWORDS)
        for line in lines:
            print(line)


if __name__ == '__main__':
    main()

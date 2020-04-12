# %% [markdown]
# Data Processing
# %% prepare training data
from poetry import data_utils
data_utils.main()

# %% generate the word embedding
from poetry import word2vec
print("Using Word2vec with alignment, use -h for usage")
embedding = word2vec.get_word_embedding(128, alignment=True)
print("Finished loading Word2vec with alignment. Size of embedding: (%d, %d)" %embedding.shape)

# %% [markdown]
# Training

# %%
import sys
print(sys.argv)

# %%
# or run `python -m poetry.train`
from poetry import train

# bypass jupyter `-f`
import tensorflow as tf
tf.app.flags.DEFINE_string('f', '__ignore__', '__ignore__')

train.train()
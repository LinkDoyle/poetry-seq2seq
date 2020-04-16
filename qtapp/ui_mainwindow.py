# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'mainwindow.ui',
# licensing of 'mainwindow.ui' applies.
#
# Created: Thu Apr 16 11:02:23 2020
#      by: pyside2-uic  running on PySide2 5.13.2
#
# WARNING! All changes made in this file will be lost!

from PySide2 import QtCore, QtGui, QtWidgets

class Ui_MainWindow(object):
    def setupUi(self, MainWindow):
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(800, 600)
        self.centralwidget = QtWidgets.QWidget(MainWindow)
        self.centralwidget.setObjectName("centralwidget")
        self.verticalLayout_2 = QtWidgets.QVBoxLayout(self.centralwidget)
        self.verticalLayout_2.setObjectName("verticalLayout_2")
        self.horizontalLayout = QtWidgets.QHBoxLayout()
        self.horizontalLayout.setObjectName("horizontalLayout")
        self.verticalLayout = QtWidgets.QVBoxLayout()
        self.verticalLayout.setObjectName("verticalLayout")
        self.lineedit_keyword = QtWidgets.QLineEdit(self.centralwidget)
        self.lineedit_keyword.setObjectName("lineedit_keyword")
        self.verticalLayout.addWidget(self.lineedit_keyword)
        self.listview_keyword = QtWidgets.QListView(self.centralwidget)
        self.listview_keyword.setObjectName("listview_keyword")
        self.verticalLayout.addWidget(self.listview_keyword)
        self.horizontalLayout.addLayout(self.verticalLayout)
        self.label_poetry = QtWidgets.QLabel(self.centralwidget)
        sizePolicy = QtWidgets.QSizePolicy(QtWidgets.QSizePolicy.Expanding, QtWidgets.QSizePolicy.Preferred)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.label_poetry.sizePolicy().hasHeightForWidth())
        self.label_poetry.setSizePolicy(sizePolicy)
        self.label_poetry.setAlignment(QtCore.Qt.AlignCenter)
        self.label_poetry.setObjectName("label_poetry")
        self.horizontalLayout.addWidget(self.label_poetry)
        self.verticalLayout_2.addLayout(self.horizontalLayout)
        self.horizontalLayout_2 = QtWidgets.QHBoxLayout()
        self.horizontalLayout_2.setObjectName("horizontalLayout_2")
        self.button_delete_keyword = QtWidgets.QPushButton(self.centralwidget)
        self.button_delete_keyword.setObjectName("button_delete_keyword")
        self.horizontalLayout_2.addWidget(self.button_delete_keyword)
        self.checkBox_cangtou = QtWidgets.QCheckBox(self.centralwidget)
        self.checkBox_cangtou.setObjectName("checkBox_cangtou")
        self.horizontalLayout_2.addWidget(self.checkBox_cangtou)
        self.button_generate = QtWidgets.QPushButton(self.centralwidget)
        self.button_generate.setObjectName("button_generate")
        self.horizontalLayout_2.addWidget(self.button_generate)
        self.verticalLayout_2.addLayout(self.horizontalLayout_2)
        MainWindow.setCentralWidget(self.centralwidget)
        self.menubar = QtWidgets.QMenuBar(MainWindow)
        self.menubar.setGeometry(QtCore.QRect(0, 0, 800, 23))
        self.menubar.setObjectName("menubar")
        MainWindow.setMenuBar(self.menubar)
        self.statusbar = QtWidgets.QStatusBar(MainWindow)
        self.statusbar.setObjectName("statusbar")
        MainWindow.setStatusBar(self.statusbar)

        self.retranslateUi(MainWindow)
        QtCore.QMetaObject.connectSlotsByName(MainWindow)

    def retranslateUi(self, MainWindow):
        MainWindow.setWindowTitle(QtWidgets.QApplication.translate("MainWindow", "Poetry Generation via AI", None, -1))
        self.lineedit_keyword.setPlaceholderText(QtWidgets.QApplication.translate("MainWindow", "Please enter keywords...", None, -1))
        self.label_poetry.setText(QtWidgets.QApplication.translate("MainWindow", "To generate", None, -1))
        self.button_delete_keyword.setText(QtWidgets.QApplication.translate("MainWindow", "Delete Keyword", None, -1))
        self.checkBox_cangtou.setText(QtWidgets.QApplication.translate("MainWindow", "CangTou", None, -1))
        self.button_generate.setText(QtWidgets.QApplication.translate("MainWindow", "Generate", None, -1))


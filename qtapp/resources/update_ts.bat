@echo off
echo generate .ts from .ui
pyside2-lupdate.exe mainwindow.ui -ts main_zhcn.ts
echo generate .qm from .ts
lrelease.exe main_zhcn.ts -qm main_zhcn.qm

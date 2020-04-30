import QtQuick 2.0
import QtQuick.Window 2.0
import QtQuick.Layouts 1.11
import QtQuick.Controls 2.0
import QtQuick.Controls.Material 2.0

Window {
    id: window
    width: 700
    title: qsTr("Hello World")
    height: 480
    visible: true

    ColumnLayout {
        spacing: 5
        anchors.fill: parent

        RowLayout {
            id: rowLayout
            Layout.fillHeight: true
            Layout.alignment: Qt.AlignLeft | Qt.AlignTop
            // height: window.height / 2
            // anchors.fill: parent
            // Layout.alignment: Qt.AlignLeft
            // Layout.fillWidth: true

            ColumnLayout {
//                anchors.fill: parent
//                Layout.fillWidth: true
//                Layout.fillHeight: true

                TextField {
                    id: textField
//                    Layout.fillHeight: false
//                    Layout.fillWidth: true
                    placeholderText: qsTr("Add keyword...")
                }


                ListView {
                    width: 180; height: 200

                    model: ['a', 's']
                    delegate: Text {
                        text: name + ": " + number
                    }
                }
            }

            ColumnLayout {
//                anchors.fill: parent
//                Layout.fillWidth: true
//                Layout.fillHeight: true

                TextArea {
                    id: textArea
                    Layout.fillWidth: true
                    Layout.fillHeight: true
                    placeholderText: qsTr("Text Area")
                }
            }


        }

        RowLayout {
            Layout.alignment: Qt.AlignLeft | Qt.AlignBottom
            Layout.fillWidth: false
            //            Layout.fillHeight: false
//            Layout.fillWidth: true

            Switch {
                id: element
                text: qsTr("CangTou")
                Layout.alignment: Qt.AlignLeft | Qt.AlignTop
                //Layout.fillHeight: true
                Layout.fillWidth: false
            }

            Button {
                id: button
                text: qsTr("Generate")
                Layout.alignment: Qt.AlignLeft | Qt.AlignTop
                Layout.fillWidth: false
                //Layout.fillHeight: true
            }
        }
    }


}

/*##^##
Designer {
    D{i:0;formeditorZoom:0.75}
}
##^##*/

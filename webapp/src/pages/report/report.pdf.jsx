import { React } from "react";
import {
    Page,
    Text,
    View,
    Document,
    Image,
    StyleSheet
} from "@react-pdf/renderer";

// Utils
import { HMS_converter } from '../../utils/HMS.util';


// From: https://github.com/diegomura/react-pdf/labels/new%20feature
const styles = StyleSheet.create({
    body: {
        padding: 10
    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderColor: '#bfbfbf',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row"
    },
    tableColHeader: {
        width: "20%",
        borderStyle: "solid",
        borderColor: '#bfbfbf',
        borderBottomColor: '#000',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCol: {
        width: "20%",
        borderStyle: "solid",
        borderColor: '#bfbfbf',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCellHeader: {
        margin: "auto",
        margin: 5,
        fontSize: 10,
        fontWeight: 500
    },
    tableCell: {
        margin: "auto",
        margin: 5,
        fontSize: 8
    },
    textDefault: {
        fontSize: 8
    }
});


export function ReportPDF({reports, endDate}) {
    console.log(reports);
    return (
        <Document>
            <Page style={styles.body}>
                <Text style={styles.textDefault}>Date Ending: {endDate}</Text>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Week</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Total Trip Distance</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Total Trip Time</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Total Emissions</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Total Trips Taken</Text>
                        </View>
                    </View>

                    {
                        reports ?
                            reports.map((report) => (
                                <>
                                    <View style={styles.tableRow}>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>{report.week}</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>{report.km.toFixed(2)} KM</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>{HMS_converter((report.totalTime / 1000).toFixed(0))}</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>{report.emission.toFixed(4)} Metric Tonnes</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>{report.count} Trips</Text>
                                        </View>
                                    </View>
                                </>
                            )
                            ) : ""
                    }
                </View>
            </Page>
        </Document>
    )
}
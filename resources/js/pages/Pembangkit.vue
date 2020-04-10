<template>
    <div class="content-wrapper">
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0 text-dark">{{ $route.meta.title }}</h1>
                    </div>
                    <breadcrumb></breadcrumb>
                </div>
            </div>
        </div>

        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header border-0">
                                <div class="row">
                                    <div class="col-md-5">
                                        <div class="form-group">
                                            <label for="">Bulan</label>
                                            <select
                                                v-model="month"
                                                class="form-control"
                                            >
                                                <option value="01"
                                                    >Januari</option
                                                >
                                                <option value="02"
                                                    >Februari</option
                                                >
                                                <option value="03"
                                                    >Maret</option
                                                >
                                                <option value="04"
                                                    >April</option
                                                >
                                                <option value="05">Mei</option>
                                                <option value="06">Juni</option>
                                                <option value="07">Juli</option>
                                                <option value="08"
                                                    >Agustus</option
                                                >
                                                <option value="09"
                                                    >September</option
                                                >
                                                <option value="10"
                                                    >Oktober</option
                                                >
                                                <option value="11"
                                                    >November</option
                                                >
                                                <option value="12"
                                                    >Desember</option
                                                >
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-5">
                                        <div class="form-group">
                                            <label for="">Tahun</label>
                                            <select
                                                v-model="year"
                                                class="form-control"
                                            >
                                                <option
                                                    v-for="(y, i) in years"
                                                    :key="i"
                                                    :value="y"
                                                    >{{ y }}</option
                                                >
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6">
                        <div class="card">
                            <div class="card-header border-0">
                                <div class="d-flex justify-content-between">
                                    <h3 class="card-title">Power Trend</h3>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="position-relative mb-4">
                                    <!-- <LineChart :chart-data="datacollection">
                                    </LineChart> -->
                                    <power-chart
                                        v-if="powers.length > 0"
                                        :data="power_data"
                                        :options="chartOptions"
                                        :labels="labels"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import moment from "moment";
import _ from "lodash";
import Breadcrumb from "../components/Breadcrumb.vue";
import PowerChart from "../components/charts/PembangkitChart.vue"; //IMPORT COMPONENT CHART

import { mapActions, mapState } from "vuex";

export default {
    created() {
        //KETIKA HALAMAN INI DI-LOAD MAKA AKAN MEMINTA DATA KE SERVER
        //DAN MENGIRIMKAN PARAMETER BULAN DAN TAHUN YANG AKTIF
        this.getChartData({
            month: this.month,
            year: this.year,
        });
    },
    data() {
        return {
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
            },
            month: moment().format("MM"), //DEFAULT BULAN YG AKTIF BERDASARKAN BULAN SAAT INI
            year: moment().format("Y"), // //DEFAULT TAHUN YG AKTIF BERDASARKAN TAHUN SAAT INI
        };
    },
    watch: {
        //KETIKA VALUE BULAN BERUBAH, MAKA KITA REQUEST DATA BARU
        month() {
            this.getChartData({
                month: this.month,
                year: this.year,
            });
        },
        //KETIKA VALUE TAHUN BERUBAH, MAKA KITA REQUEST DATA BARU
        year() {
            this.getChartData({
                month: this.month,
                year: this.year,
            });
        },
    },
    computed: {
        ...mapState("pembangkit", {
            powers: (state) => state.powers, //AMBIL DATA DARI STATE
        }),
        //LIST TAHUN DARI 2010 SAMPAI TAHUN SAAT INI UNTUK DILOOPING DI FILTER TAG
        years() {
            return _.range(2017, moment().add(1, "years").format("Y"));
        },
        //DATA LABELS YANG DITERIMA DARI SERVER
        labels() {
            //KARENA FORMAT DATANYA BERISI TOTAL DAN DATE, MAKA KITA FILTER HANYA AKAN MENGAMBIL DATENYA SAJA
            return _.map(this.powers, function (o) {
                return moment(o.date).format("DD");
            });
        },
        //DATA TOTAL TRANSAKSI YANG DITERIMA DARI SERVER
        power_data() {
            //KITA FILTER KARENA HANYA AKAN MENGAMBIL TOTAL VALUENYA SAJA
            return _.map(this.powers, function (o) {
                console.log(o.total);
                return o.total;
            });
        },
    },
    methods: {
        ...mapActions("pembangkit", ["getChartData"]),
    },
    components: {
        breadcrumb: Breadcrumb,
        "power-chart": PowerChart,
    },
};

// import Breadcrumb from "../components/Breadcrumb.vue";
// import LineChart from "../components/charts/PembangkitLine.js";

// export default {
//     components: {
//         breadcrumb: Breadcrumb,
//         LineChart,
//     },
//     data() {
//         return {
//             datacollection: null,
//             loaded: false,
//         };
//     },
//     mounted() {
//         this.fillData();
//     },
//     methods: {
//         fillData() {
//             this.datacollection = {
//                 labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//                 datasets: [
//                     {
//                         label: "Temp",
//                         backgroundColor: "rgba(255,0,0,0.2)",
//                         boderColor: "lightpink",
//                         pointBackgroundColor: "red",
//                         borderWidth: 1,
//                         pointBorderColor: "red",
//                         data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//                     },
//                     {
//                         label: "Hum %",
//                         backgroundColor: "rgba(255,0,0,0.2)",
//                         boderColor: "lightblue",
//                         pointBackgroundColor: "blue",
//                         borderWidth: 1,
//                         pointBorderColor: "blue",
//                         data: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
//                     },
//                 ],
//             };
//         },
//     },
// };
</script>

<style lang="scss" scoped></style>

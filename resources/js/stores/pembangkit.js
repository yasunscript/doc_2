import $axios from "../api.js";

const state = () => ({
    powers: [], //STATE UNTUK MENYIMPAN DATA POWER TREND
});

const mutations = {
    //MUTATION UNTUK MEMANIPULASI DATA STATE POWER
    ASSIGN_DATA_POWER(state, payload) {
        state.powers = payload;
    },
};

const actions = {
    //ACTION UNTUK MENG-HANDLE REQUEST KE SERVER
    getChartData({ commit }, payload) {
        return new Promise((resolve, reject) => {
            //MINTA DATA CHART POWER TREND KE SERVER BERDASARKAN BULAN DAN TAHUN
            $axios
                .get(`/power-chart?month=${payload.month}&year=${payload.year}`)
                .then((response) => {
                    //KEMUDIAN KIRIM DATA NYA KE MUTATION UNTUK KEMUDIAN DISIMPAN KE STATE
                    commit("ASSIGN_DATA_POWER", response.data);
                    resolve(response.data);
                });
        });
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};

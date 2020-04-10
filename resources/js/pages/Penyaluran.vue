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
            <div class="container-fluid"></div>
        </section>
    </div>
</template>

<script>
import Breadcrumb from "../components/Breadcrumb.vue";
export default {
    components: {
        breadcrumb: Breadcrumb,
    },
};
</script>

<style lang="scss" scoped></style>

<template>
    <p>{{ greeting }} World! </p>
</template>

<script>
    export default{
        name : 'dialog',
        data : function(){
            return {
                greeting : this.greeting
            }
        },
        props : {
            greeting : {
                required : true,
                default  : "这里是中国China"
            }
        }
    }
</script>

<style scoped>
    p{
        font-size : 2em;
        text-align : center;
    }
</style>
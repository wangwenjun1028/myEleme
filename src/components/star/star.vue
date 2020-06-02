<template>
    <div class="star">
        <span :class="p" v-for="(p,i) of typeArr" :key='i'>
            
        </span>
    </div>
</template>
<script>
export default {
    data(){
        return {
            total:5,
            typeArr:[]
        }
    },
    props: ['score','size'],
    methods:{
        getClass(){
            let result=[];
            let score=this.score;
            let s=Math.floor(score*2);
            let decimo=s%2;
            if(decimo==1){
                for(var i=1;i<=this.total;i++){//3.6
                    if(i<Math.floor(score)){
                        result.push(`icon-${this.size} on`)
                    }else if(i==Math.floor(score)){
                        result.push(`icon-${this.size} half`)
                    }else{
                        result.push(`icon-${this.size} off`)
                    }
                }
            }else{//3.2
                for(var i=1;i<=this.total;i++){
                    if(i<=Math.floor(score)){
                        result.push(`icon-${this.size} on`)
                    }else{
                        result.push(`icon-${this.size} off`)
                    }
                }
            }
            this.typeArr=result;
        }
    },
    mounted () {
        this.getClass();
    }
}
</script>
<style lang="less" scoped>
    .star{
        display: flex;
        justify-content: center;
        span{
            display: block;
            width: 20px;
            height: 20px;
        }
        .icon-20{
            width: 20px;
            height: 20px;
        }
        .icon-20+.icon-20{
            margin-left: 22px
        }
        .icon-15{
           width: 15px;
            height: 15px; 
        }
        .icon-15+.icon-15{
            margin-left:3px;
        }
        span.on{
            background: url(./star24_on@3x.png) no-repeat center;
            background-size: 100% 100%
        }
        span.half{
            background: url(./star24_half@3x.png) no-repeat center;
            background-size: 100% 100%;  
        }
        span.off{
            background: url(./star36_off@2x.png) no-repeat center;
            background-size: 100% 100%; 
        }
    }

</style>



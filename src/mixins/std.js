/**
 * 标准差 standard deviation
 */
export default {
    data() {
        return {
        };
    },
    methods: {
        getStd(arr) {
            var sum = function (x, y) { return x * 1 + y * 1; };　　//求和函数
            var square = function (x) { return x * x; };　　//数组中每个元素求它的平方
            // var arr = [1,1,3,5,5];　　//
            var mean = arr.reduce(sum) / arr.length;
            var deviations = arr.map(function (x) { return x - mean; });
            var stddev = Math.sqrt(deviations.map(square).reduce(sum) / (arr.length - 1));
            return stddev.toFixed(2)
        }
    },
    components: {},
    created() {
    },
    mounted() { },
    computed: {}
};

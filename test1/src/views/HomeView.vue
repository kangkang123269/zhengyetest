<template>
  <div class="home">
    <div class="content">
      <div class="content-li" v-for="(item, index) in options" :key="item.id">
        <el-date-picker
          v-model="item.value"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
          @change="pickerChange(item.value, index)"
        >
        </el-date-picker>
        <div class="content-input">
          <el-input
            v-model.lazy="item.input"
            @change="inputChange(item.input, index)"
            placeholder="请输入数字"
          ></el-input>
        </div>
      </div>
    </div>
    <div class="option">
      <el-button @click="add" type="primary">新增</el-button>
    </div>
  </div>
</template>

<script>
import { isLegal, isfilter } from "../utils/func";
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      disableFilterArr: [
      ],
      options: [
        {
          id: 1,
          input: '',
          value: '',
        },
      ],
    };
  },
  computed: {
    pickerOptions() {
      let that = this;
      return {
        disabledDate(time) {
          return isfilter(that.disableFilterArr, time.getTime());
        },
      };
    },
  },
  methods: {
    // 对输入函数进行防抖操作
    inputChange: function (value, index) {
      console.log(value);
      if (value && !/^(0|[1-9]\d{0,8})$|^-(0|[1-9]\d{0,8})$/.test(value)) {
        this.$message.error("数字不合法，请重新输入");
        this.options[index].input = "";
      }
    },
    add() {
      this.options.push({
        id: this.options.length + 1,
        input: '',
        value: '',
      });
    },
    pickerChange(val, index) {
      let first = Date.parse(val[0]);
      let end = Date.parse(val[1]);
      let arr = JSON.parse(JSON.stringify(this.disableFilterArr));
      if (isLegal(first, end, arr)) {
        arr[index] = [first, end];
        this.disableFilterArr = arr;
      } else {
        this.$message.error("选择不合法，请重新输入！！")
        let options = JSON.parse(JSON.stringify(this.options))
        options[index].value = ''
        this.options = options 
      }
    },
  },
};
</script>
<style lang="less" scoped>
.content {
  &-li {
    display: flex;
    margin-top: 10px;
  }
  &-input {
    width: 200px;
    margin-left: 20px;
  }
}
.option {
  margin-top: 20px;
}
</style>

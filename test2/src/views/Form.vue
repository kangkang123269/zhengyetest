<template>
  <div>
    <div>
      字段类型：<a-select
        v-model:value="value"
        style="width: 400px"
        :options="options[radio].arr"
        placeholder="日期"
      ></a-select>
    </div>
    <div class="type">
      <div>日期类型：</div>
      <a-radio-group v-model:value="radio">
        <a-radio :style="radioStyle" :value="0">年-月</a-radio>
        <a-radio :style="radioStyle" :value="1">年-月-日</a-radio>
        <a-radio :style="radioStyle" :value="2">年-月-日 时 分</a-radio>
      </a-radio-group>
    </div>
    <div>
      <div>
        字段类型：<a-select
          v-model:value="value"
          style="width: 400px"
          :options="DownListoptions"
          placeholder="单选下拉框"
        ></a-select>
      </div>
      <div class="DrapDown">
        <div class="title">选项：</div>
        <div>
          <div class="item" v-for="(item,index) in DownListoptions" :key="item">
            <a-input @input="inputEvent($event,index)" @click="select(index)" :value="item.value" />
          </div>
        </div>
        <div class="button">
          <div class="bt">
            <a-button  @click="addEl" type="primary">添加</a-button>
          </div>
          <div class="bt">
            <a-button @click="deleteEl" type="primary">删除</a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, reactive, toRefs, ref } from "@vue/runtime-core";
export default {
  setup() {
    const state = reactive({
      value: null,
      options: [
        {
          arr: [
            { value: "2020-11" },
            { value: "2020-12" },
            { value: "2020-01" },
          ],
        },
        {
          arr: [
            { value: "2020-11-01" },
            { value: "2020-12-02" },
            { value: "2020-01-03" },
          ],
        },
        {
          arr: [
            { value: "2020-11-01 11:11" },
            { value: "2020-12-02 12:22" },
            { value: "2020-01-03 13:11" },
          ],
        },
      ],
      DownListoptions: [{value:"选项一"}, {value:"选项二"}],
    });
    const radio = ref(0);
    const radioStyle = reactive({
      display: "flex",
      height: "30px",
      lineHeight: "30px",
    });

    onBeforeMount(() => {
      // 后续操作，可能会用到
      let data = JSON.parse(localStorage.getItem("data"));
      console.log(data);
    });
    const selected = ref(0)
    const select = (index) => {
      selected.value = index
    }
    const deleteEl = () => {
      state.DownListoptions.splice(selected.value,1)
    }
    const  addEl = () => {
      state.DownListoptions.push(
        {value:""}
      )
    }
    const inputEvent = (e,index) => {
      state.DownListoptions[index].value = e.target.value
    }
    return {
      ...toRefs(state),
      radio,
      radioStyle,
      select,
      deleteEl,
      addEl,
      inputEvent
    };
  },
};
</script>

<style lang="less" scoped>
.type {
  display: flex;
}
.DrapDown {
  display: flex;
  .title {
    margin-top: 10px;
  }
  .item {
    margin-top: 10px;
    margin-left: 10px;
  }
  .button {
    margin-left: 40px;
    .bt {
      margin-top: 10px;
    }
  }
}
</style>
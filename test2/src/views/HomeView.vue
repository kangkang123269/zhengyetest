<template>
  <a-table :columns="columns" :data-source="data">
    <template #bodyCell="{ record, column }">
      <template v-if="column.key === 'operation'">
        <a @click="edit(record)">编辑</a>
      </template>
    </template>
  </a-table>
  <a-button @click="toFromPage" type="primary">生成表单</a-button>
  <a-modal v-model:visible="visible" title="编辑" @ok="handleOk">
    <p>
      字段名称：<a-input v-model:value="name" placeholder="请输入字段名称" />
    </p>
    <p>
      字段类型：<a-input v-model:value="type" placeholder="请输入字段类型" />
    </p>
    <p>
      是否必填：
      <a-radio-group v-model:value="need" name="radioGroup">
        <a-radio value="是">是</a-radio>
        <a-radio value="否">否</a-radio>
      </a-radio-group>
    </p>
    <p>
      字段选项：<a-input v-model:value="content" placeholder="请输入字段选项" />
    </p>
  </a-modal>
</template>
<script>
import { reactive, ref, toRaw, toRefs } from "@vue/reactivity";
import { useRouter } from "vue-router";
export default {
  setup() {
    const visible = ref(false);
    const router = useRouter()
    const columns = ref([
      { title: "字段名称", dataIndex: "name", key: "1" },
      { title: "字段类型", dataIndex: "type", key: "2" },
      { title: "是否必填", dataIndex: "need", key: "3" },
      { title: "字段选项", dataIndex: "content", key: "4" },
      {
        title: "操作",
        key: "operation",
        fixed: "right",
        width: 100,
      },
    ]);

    const data = ref([
      {
        key: "1",
        name: "字段一",
        type: "单行文本",
        need: "是",
        content: "无",
      },
      {
        key: "2",
        name: "字段二",
        type: "日期",
        need: "否",
        content: "年-月-日",
      },
      {
        key: "3",
        name: "字段三",
        type: "单选下拉",
        need: "否",
        content: "选项一、选项二",
      },
    ]);

    const ModalData = reactive({
      key:"",
      name: "",
      type: "",
      need: "",
      content: "",
    });

    const showModal = (record) => {
      visible.value = true;
      ModalData.key = record.key
      ModalData.name = record.name
      ModalData.type = record.type
      ModalData.need = record.need
      ModalData.content = record.content
    };

    const handleOk = () => {
      visible.value = false;
      let index = data.value.findIndex(item => item.key == ModalData.key)
      data.value[index] = ModalData
    };
    const edit = (record) => {
      showModal(record);
    };
    const toFromPage = () => {
      let formData =  toRaw(data.value)
      console.log(formData);
      localStorage.setItem("data",JSON.stringify(formData))
      router.push('/submit')
    }
    return {
      data,
      columns,
      edit,
      visible,
      handleOk,
      toFromPage,
      ...toRefs(ModalData)
    };
  },
};
</script>


<template>
<Layout id="sys-detail">
  <Header class="tab-content">
    <Row>
      <Col span="16">
      <Input search icon="ios-search" enter-button=" 搜索" placeholder="输入关键字搜索..." />
      </Col>
      <Col class="btn">
      <Button type="text" ghost>精确检索</Button>
      </Col>
    </Row>
  </Header>

  <Menu class="tab-content" mode="horizontal" active-name="1">
    <Row>
      <Col span="16">
      <MenuItem name="1">基站</MenuItem>
      <MenuItem name="2">用户</MenuItem>
      <MenuItem name="3">档案</MenuItem>
      <MenuItem name="4">更多>></MenuItem>
      </Col>
    </Row>
  </Menu>

  <div class="tab-content">
    <Row>
      <Col span="16" class="tab-left">
      <ul>
        <li>
          <h3>AH-DESC-34sSDSDG</h3>
          <p>AH-DESC-34sSDSDG,地铁，微小站AH-DESC-34sSDSDG,地铁，微小站AH-DESC-34sSDSDG,地铁，微小站AH-DESC-34sSDSDG,地铁，微小站</p>
          <div class="operation">
            <span class="edit" @click="$_edit">【编辑】</span>
            <span>【查看】</span>
          </div>
        </li>
        <li>
          <h3>AH-DESC-34sSDSDG</h3>
          <p>AH-DESC-34sSDSDG,地铁，微小站AH-DESC-34sSDSDG,地铁，微小站AH-DESC-34sSDSDG,地铁，微小站AH-DESC-34sSDSDG,地铁，微小站</p>
          <div class="operation">
            <span class="edit">【编辑】</span>
            <span>【查看】</span>
          </div>
        </li>
        <li>
          <h3>AH-DESC-34sSDSDG</h3>
          <p>AH-DESC-34sSDSDG,地铁，微小站AH-DESC-34sSDSDG,地铁，微小站AH-DESC-34sSDSDG,地铁，微小站AH-DESC-34sSDSDG,地铁，微小站</p>
          <div class="operation">
            <span class="edit">【编辑】</span>
            <span>【查看】</span>
          </div>
        </li>
        <li>
          <h3>AH-DESC-34sSDSDG</h3>
          <p>AH-DESC-34sSDSDG,地铁，微小站AH-DESC-34sSDSDG,地铁，微小站AH-DESC-34sSDSDG,地铁，微小站AH-DESC-34sSDSDG,地铁，微小站</p>
          <div class="operation">
            <span class="edit">【编辑】</span>
            <span>【查看】</span>
          </div>
        </li>
        <li>
          <h3>AH-DESC-34sSDSDG</h3>
          <p>AH-DESC-34sSDSDG,地铁，微小站AH-DESC-34sSDSDG,地铁，微小站AH-DESC-34sSDSDG,地铁，微小站AH-DESC-34sSDSDG,地铁，微小站</p>
          <div class="operation">
            <span class="edit">【编辑】</span>
            <span>【查看】</span>
          </div>
        </li>
      </ul>
      </Col>
      <Col span="8" class="tab-right">
      <h3>热门标签</h3>
      <ul>
        <li>3G</li>
        <li>4G</li>
        <li>高速</li>
        <li>商圈</li>
        <li>地铁</li>
        <li>商务区</li>
        <li>居住区</li>
        <li>更多>></li>
      </ul>
      </Col>
    </Row>
  </div>
</Layout>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  methods: {
    $_edit() {
      this.$router.push({
        path: '/baseStation'
      });
    }
  },
  mounted() {

  },
};
</script>

<style lang="scss">

</style>

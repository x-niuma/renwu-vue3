<template>
  <div class="view">
    <div class="content" v-if="true">
      <van-field v-model="form.title" placeholder="标题" />
      <van-field v-model="form.content" placeholder="添加正文" type="textarea" />
      <van-field
        v-model="form.projectType"
        placeholder="参与话题"
        :readonly="true"
        :is-link="true"
        @click.native="showProjectAppPicker=true"
      />
      <ProjectTypePicker
        v-model="showProjectAppPicker"
        @cancel="showProjectAppPicker=false"
        @confirm="handleConfirmProjectType"
      />

      <van-field
        v-model="form.city"
        placeholder="添加地点"
        :readonly="true"
        :is-link="true"
        @click.native="showCityPicker=true"
      />
      <cityPicker v-model="showCityPicker" @on-confirm="onCityChange" />

      <div class="upload-wrap">
        <div class="preview-box" v-for="(item, index) in pickList" :key="index">
          <img class="pre-item" :src="item.content" />
          <div @click="removeItem(index)">
            <div class="progress" v-if="item.percent">{{ item.percent.toFixed(0) }}%</div>
            <img class="icon-remove" src="./img/remove.png" alt="图片" />
          </div>
        </div>
        <van-uploader class="touch-area" :after-read="onRead">
          <template v-show="pickList.length === 0">
            <img class="icon-add" src="./img/add.png" />
          </template>
        </van-uploader>
      </div>
    </div>

    <!-- 提交按钮 -->
    <div class="footer">
      <van-button  size="large" type="primary" @click="handleSubmit">
        <span>提交</span>
      </van-button>
    </div>

    <van-dialog v-model="showFormError" title="您提交的参数不规范">
      <ul class="error-list">
        <li v-for="(item, index) in errors" :key="index">{{ index + 1 }}. {{ item }}</li>
      </ul>
    </van-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Toast } from 'vant'
import * as qiniu from 'qiniu-js'
import API from '../../../api'
import cityPicker from 'baseUI/cityPicker'
import categoryPicker from 'baseUI/categoryPicker'
import tradeWayPicker from 'baseUI/tradeWayPicker'
import AppTypePicker from 'biz/app-type-picker'
import ProjectTypePicker from 'biz/project-type-picker'

export default {
  components: {
    cityPicker,
    categoryPicker,
    tradeWayPicker,
    AppTypePicker,
    ProjectTypePicker
  },

  data() {
    return {
      tabIndex: 0,
      checked: '',
      form: {
        title: '',
        city: '',
        content: ''
      },
      pickList: [],
      token: '',
      // 分类 picker
      categoryValue: null,
      showCategoryPicker: false,
      // 交易方式 picker
      tradeWayPickerValue: null,
      showTradeWayPicker: false,
      // 所在城市 picker
      cityPickerValue: null,
      showCityPicker: false,
      // 表单校验结果
      errors: [],
      showFormError: false,
      showProjectAppPicker: false
    }
  },

  computed: {
    ...mapState({
      categoryList: state => state.xzProduct.category.list
    }),

    categoryName() {
      const findIndex = this.categoryList.findIndex(element => +element.id === +this.form.categoryId)
      if (findIndex !== -1) {
        return this.categoryList[findIndex].name
      } else {
        return ''
      }
    }
  },

  mounted() {
    this.doGet7nToken()
    if (this.$route.query.itemId) {
      this.doGetXzProductItem()
    }
  },

  methods: {
    // 确认应用类型
    handleConfirmAppType(obj) {
      this.showCategoryPicker = false
      this.form.appType = obj.name
      this.form.appTypeId = obj.id
    },

    // 确认项目类型
    handleConfirmProjectType(obj) {
      this.showProjectAppPicker = false
      this.form.projectType = obj.label
      this.form.projectTypeId = obj.id
    },

    // 选择图片
    onRead(file) {
      this.pickList.push(file)
      this.uploadImg(this.pickList.length - 1, file.file)
    },

    // 删除图片
    removeItem(index) {
      this.pickList.splice(index, 1)
    },

    // 获取七牛云token
    async doGet7nToken() {
      try {
        let ret = await API.get7nToken()
        if (+ret.errCode === 0) {
          this.token = ret.data.token
        } else {
          Toast(ret.errMsg)
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 获取商品信息
    async doGetXzProductItem() {
      try {
        let ret = await API.getXzProductItem(this.$route.query.itemId)
        if (+ret.retCode === 0) {
          this.itemInfo = ret.data
          this.form.title = this.itemInfo.title
          this.form.city = this.itemInfo.city
          this.form.content = this.itemInfo.content
          this.form.categoryId = this.itemInfo.category_id
          this.form.tradeWayId = this.itemInfo.trade_way_id
          this.form.appTypeId = this.itemInfo.app_type_id
          this.form.projectTypeId = this.itemInfo.project_type_id
          this.pickList = this.itemInfo.imgs.map(element => {
            return {
              url: element,
              content: element,
              percent: 100
            }
          })
        } else {
          Toast(ret.errMsg)
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 上传图片
    uploadImg(index, file, callback) {
      const vm = this
      const observable = qiniu.upload(file, file.name, this.token, {}, {})
      observable.subscribe({
        next(res) {
          vm.pickList[index]['percent'] = res.total.percent
          vm.pickList = [].concat(vm.pickList)
        },
        error(error) {
          vm.pickList[index]['percent'] = ''
          Toast(error)
        },
        complete(res) {
          vm.pickList[index]['url'] = `//c1.airtlab.com/${res.key}`
          vm.pickList[index]['percent'] = ''
          vm.pickList = [].concat(vm.pickList)
        }
      })
    },

    // 创建
    async doCreate() {
      try {
        let imgs = this.pickList.map(element => element.url)
        const params = {
          ...this.form,
          pics: imgs.join(',')
        }
        let ret = await API.topicAdd(params)
        if (+ret.errCode === 0) {
          Toast.success('发布成功')
        } else {
          Toast(ret.errMsg)
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 修改
    async doUpdateProduct() {
      try {
        let imgs = this.pickList.map(element => element.url)
        imgs = JSON.stringify(imgs)
        const params = {
          ...this.form,
          imgs: imgs,
          itemId: this.$route.query.itemId
        }
        let ret = await API.updateXzProduct(params)
        if (+ret.errCode === 0) {
          Toast.success('发布成功')
        } else {
          Toast(ret.errMsg)
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 参数校验
    handleSubmit() {
      const form = this.form
      const errors = []
      if (form.title.length < 5) {
        errors.push('标题长度不能小于5')
      }
      if (form.content.length < 5) {
        errors.push('内容长度不能小于5')
      }
      this.errors = errors
      this.showFormError = !!errors.length
      if (!this.showFormError) {
        this.doCreate()
      }
    },

    // 选择分类
    onCategoryChange(data) {
      this.categoryValue = data
      this.form.categoryId = data.id
      this.form.categoryName = data.name
      this.showCategoryPicker = false
    },

    // 选择交易方式
    onTradeWayChange(data) {
      this.tradeWayPickerValue = data
      this.form.tradeWayId = data.id
      this.showTradeWayPicker = false
    },

    // 选择所在城市
    onCityChange(data) {
      this.cityPickerValue = data
      let values = []
      data.forEach(element => {
        values.push(element.name)
      })
      this.form.city = values.join(' ')
    }
  }
}
</script>

<style lang="less" scoped src="./index.less"></style>

import {
  addComment,
  addReply,
  queryCommentList,
  queryReplyList
} from '@/service/auto-service/评论模块'
import { defineStore, acceptHMRUpdate } from 'pinia'
import * as ProjectAPI from '@/service/auto-service/项目模块'
import { formatDate } from '@/utils/date'

const initState = {
  detail: null as null | ProjectItemVo,
  comments: [] as CommentItemVo[],
  isEdit: false,
  speakCommentInfo: null as null | CommentItemVo,
  speakReply: null as null | ReplyItemVo
}

export const useProjectDetailStore = defineStore('project-detail', {
  state: () => ({ ...initState }),
  actions: {
    reset() {
      this.$patch({ ...initState })
    },

    async queryDetail(projectId: number) {
      let res = await ProjectAPI.queryDetail({
        id: projectId
      });
      res.data.create_time = formatDate(res.data.create_time)
      this.$patch({ detail: res.data })
    },

    async getComments(props: QueryCommentListDTO) {
      const res = await queryCommentList({
        ...props
      })
      this.$patch({
        comments: [...this.comments, ...res.data.list].map((it) => {
          return {
            ...it,
            create_time: formatDate(it.create_time)
          }
        })
      })
      return res
    },

    queryReplyList(comment_id: number, props: QueryReplyListDTO) {
      const current = this.comments.find((it) => it.id === comment_id)
      return queryReplyList({
        comment_id,
        ...props
      }).then((res) => {
        current.reply_info.has_more = res.data.has_more
        current.reply_info.list = [...current.reply_info.list, ...res.data.list].map((it) => {
          return {
            ...it,
            create_time: formatDate(it.create_time)
          }
        })
        current.reply_info.total = res.data.total
      })
    },

    addComment(props: AddCommentDTO) {
      addComment(props).then((res) => {
        this.$patch({
          comments: [res.data, ...this.comments]
        })
      })
    },

    showEdit() {
      this.$patch({ isEdit: true })
    },

    hideEdit() {
      this.$patch({ isEdit: false })
    },

    // 回复评论
    replyToComment(props: AddReplyDTO) {
      addReply(props)
    },

    // 清楚回复信息
    clearSpeakId() {
      this.$patch({ speakReply: null, speakCommentInfo: null })
    },

    // 回复另一个回复
    setSpeakReplay(data: ReplyItemVo) {
      this.$patch({ speakReply: data })
    },

    // 回复另一个评论
    setSpeakComment(data: CommentItemVo) {
      this.$patch({ speakCommentInfo: data })
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProjectDetailStore, import.meta.hot))
}

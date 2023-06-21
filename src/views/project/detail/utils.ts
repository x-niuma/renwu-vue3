// 操作动作所代表的含义
export enum TrackActionTypeEnum {
  like = 1,     // 点赞
  star = 2,     // 收藏
  dislike = 3,  // 踩
  follow = 4,   // 关注
  view = 5      // 浏览
}

// 操作的实体对象类型
export enum TrackEntityTypeEnum {
  feed = 1,     // 主题
  comment = 2,  // 评论
  reply = 3,    // 回复
  user = 4,     // 用户
  project = 5   // 项目
}
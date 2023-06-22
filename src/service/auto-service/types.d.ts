declare interface SendSmsCodeDto {
  mobile: string;
}

declare interface RegisterDto {
  account: string;
  password?: string;
  code?: string;
  registerType: string;
}

declare interface RegisterRes {
  id: number;
  create_time: string;
  update_time: string;
  account: string;
  password: string;
  mobile: string;
  email: string;
  nickname: string;
  avatar: string;
  gender: string;
  birthday: string;
  city: string;
  college: string;
  introduction: string;
  background: string;
  status: boolean;
  token: string;
  reputation: number;
}

declare interface RegisterByAccountDto {
  account: string;
  password?: string;
}

declare interface LoginDto {
  account: string;
  password?: string;
  code?: string;
  codeType?: string;
  loginType: string;
}

declare interface LoginRes {
  id: number;
  create_time: string;
  update_time: string;
  account: string;
  password: string;
  mobile: string;
  email: string;
  nickname: string;
  avatar: string;
  gender: string;
  birthday: string;
  city: string;
  college: string;
  introduction: string;
  background: string;
  status: boolean;
  token: string;
  reputation: number;
}

declare interface PwdLoginDto {
  account: string;
  password: string;
}

declare interface CodeLoginDTO {
  account: string;
  code: string;
}

declare interface CheckLoginRes {
  status: boolean;
  user: undefined;
}

declare interface GetUserInfoRes {
  id: number;
  create_time: string;
  update_time: string;
  account: string;
  password: string;
  mobile: string;
  email: string;
  nickname: string;
  avatar: string;
  gender: string;
  birthday: string;
  city: string;
  college: string;
  introduction: string;
  background: string;
  status: boolean;
}

declare interface SendCodeDto {

}

declare interface SendCodeRes {
  status: boolean;
}

declare interface UpdateUserInfoDto {

}

declare interface InitPasswordDto {

}

declare interface InitPasswordRes {
  status: boolean;
}

declare interface UpdatePasswordDto {
  password: string;
  newPassword: string;
}

declare interface UpdatePwdRes {
  status: boolean;
}

declare interface BindMobileDto {
  mobile: string;
  code: string;
}

declare interface BindEmailDto {
  email: string;
  code: string;
}

declare interface GetWxQrCodeForAuthCodeDTO {
  redirect: string;
}

declare interface GetWexinAuthUrlVo {
  uri: string;
  token: string;
  img: string;
}

declare interface GetUserReputationFlowDTO {
  pageSize?: number;
  pageIndex?: number;
  skip?: number;
}

declare interface QueryCommentListDTO {
  pageSize?: number;
  pageIndex?: number;
  skip?: number;
  topic_type: string;
  topic_id: number;
}

declare interface ReplyItemVo {
  id: number;
  create_time: string;
  update_time: string;
  from_uid: number;
  to_uid: number;
  comment_id: number;
  reply_type: string;
  reply_id: number;
  content: string;
  images: string;
  author_name: string;
  author_avatar: string;
  to_name: string;
  to_avatar: string;
}

declare interface QueryReplyListVo {
  list: {
  id: number;
  create_time: string;
  update_time: string;
  from_uid: number;
  to_uid: number;
  comment_id: number;
  reply_type: string;
  reply_id: number;
  content: string;
  images: string;
  author_name: string;
  author_avatar: string;
  to_name: string;
  to_avatar: string;
}[];
  total: number;
  has_more: boolean;
}

declare interface CommentItemVo {
  id: number;
  create_time: string;
  update_time: string;
  from_uid: number;
  topic_type: string;
  topic_id: number;
  content: string;
  images?: string;
  author_name: string;
  author_avatar: string;
  reply_info: {
  list: {
  id: number;
  create_time: string;
  update_time: string;
  from_uid: number;
  to_uid: number;
  comment_id: number;
  reply_type: string;
  reply_id: number;
  content: string;
  images: string;
  author_name: string;
  author_avatar: string;
  to_name: string;
  to_avatar: string;
}[];
  total: number;
  has_more: boolean;
};
}

declare interface QueryCommentListVo {
  list: {
  id: number;
  create_time: string;
  update_time: string;
  from_uid: number;
  topic_type: string;
  topic_id: number;
  content: string;
  images?: string;
  author_name: string;
  author_avatar: string;
  reply_info: {
  list: {
  id: number;
  create_time: string;
  update_time: string;
  from_uid: number;
  to_uid: number;
  comment_id: number;
  reply_type: string;
  reply_id: number;
  content: string;
  images: string;
  author_name: string;
  author_avatar: string;
  to_name: string;
  to_avatar: string;
}[];
  total: number;
  has_more: boolean;
};
}[];
  total: number;
}

declare interface AddCommentDTO {
  topic_type: string;
  topic_id: number;
  content: string;
  images?: string;
}

declare interface AddCommentVo {
  id: number;
  create_time: string;
  update_time: string;
  from_uid: number;
  topic_type: string;
  topic_id: number;
  content: string;
  images?: string;
  author_name: string;
  author_avatar: string;
}

declare interface RemoveCommentDTO {
  id: number;
}

declare interface QueryReplyListDTO {
  pageSize?: number;
  pageIndex?: number;
  skip?: number;
  comment_id: number;
}

declare interface AddReplyDTO {
  to_uid: number;
  comment_id: number;
  reply_type: string;
  reply_id: number;
  content: string;
  images?: string;
}

declare interface RemoveReplyDTO {
  id: number;
}

declare interface QueryFeedTagDTO {
  category_id?: number;
}

declare interface RemoveFeedDTO {
  id?: number;
}

declare interface CreateFeedDTO {
  title: string;
  content: string;
  images: string;
  category_id: number;
}

declare interface QueryFeedDTO {
  pageSize?: number;
  pageIndex?: number;
  skip?: number;
  title?: string;
  category_id?: string;
}

declare interface SaveTrackDTO {
  entity_type: number;
  action_type: number;
  entity_id: number;
  flag: number;
}

declare interface QueryListForUserDTO {
  pageSize?: number;
  pageIndex?: number;
  skip?: number;
  entity_type: number;
  action_type: number;
}

declare interface TrackItemVo {
  id: number;
  create_time: string;
  update_time: string;
  entity_type: number;
  action_type: number;
  entity_id: number;
  from_uid: number;
  author_name: string;
  author_id: number;
}

declare interface QueryTrackListForUserVO {
  total: number;
  list: {
  id: number;
  create_time: string;
  update_time: string;
  entity_type: number;
  action_type: number;
  entity_id: number;
  from_uid: number;
  author_name: string;
  author_id: number;
}[];
}

declare interface QueryStatusForUserDTO {
  entity_type: number;
  action_type: number;
  entity_id: number;
}

declare interface QueryCountForEntityDTO {
  pageSize?: number;
  pageIndex?: number;
  skip?: number;
  entity_type: number;
  action_type: number;
  entity_id: number;
}

declare interface QueryProjectTagDTO {
  category_id?: number;
}

declare interface RemoveProjectDTO {
  id?: number;
}

declare interface CreateProjectDTO {
  id?: number;
  create_time?: string;
  update_time?: string;
  user_id?: number;
  title?: string;
  skill?: string;
  description?: string;
  remark?: string;
  reward?: number;
  images?: string;
  city?: string;
  city_code?: string;
  category_id?: number;
  task_type?: number;
  task_type_name?: string;
}

declare interface ProjectUpdateVo {
  status: boolean;
}

declare interface QueryProjectDTO {
  pageSize?: number;
  pageIndex?: number;
  skip?: number;
  title?: string;
  task_type?: string;
  category_id?: string;
  id?: number;
}

declare interface ProjectItemVo {
  id: number;
  create_time: string;
  update_time: string;
  user_id: number;
  title: string;
  skill: string;
  description: string;
  remark: string;
  reward: number;
  images: string;
  city: string;
  city_code: string;
  category_id: number;
  task_type: number;
  task_type_name: string;
  category_name: string;
  author_name: string;
  author_avatar: string;
  like_count: number;
  star_count: number;
  comment_count: number;
}

declare interface ProjectListVo {
  total: number;
  list: {
  id: number;
  create_time: string;
  update_time: string;
  user_id: number;
  title: string;
  skill: string;
  description: string;
  remark: string;
  reward: number;
  images: string;
  city: string;
  city_code: string;
  category_id: number;
  task_type: number;
  task_type_name: string;
  category_name: string;
  author_name: string;
  author_avatar: string;
  like_count: number;
  star_count: number;
  comment_count: number;
}[];
}

declare interface QueryListByIdListDTO {
  id: any[];
}

declare interface QueryProjectDetailDTO {
  id: number;
}

declare interface AddrQueryListDTO {
  pageSize?: number;
  pageIndex?: number;
  skip?: number;
}

declare interface AddrItemQueryDTO {

}

declare interface AddrAddDTO {

}

declare interface AddrDeleteDTO {

}

declare interface AddrUpdateDTO {

}

declare interface CityNode {
  value: string;
  text: string;
  children?: CityNode[];
}

declare interface QueryWalletAccountVO {
  id: number;
  create_time: string;
  update_time: string;
  user_id: number;
  password: string;
  amount: number;
  frozen_amount: number;
  status: number;
}

declare interface WalletAccountFlowEntity {
  id: number;
  create_time: string;
  update_time: string;
  user_id: number;
  record_no: string;
  third_no: string;
  amount: number;
  change_type: number;
  action_type: number;
  description: string;
}

declare interface QueryWalletFlowVO {
  list: {
  id: number;
  create_time: string;
  update_time: string;
  user_id: number;
  record_no: string;
  third_no: string;
  amount: number;
  change_type: number;
  action_type: number;
  description: string;
}[];
  total: number;
}

declare interface WalletBankEntity {
  id: number;
  create_time: string;
  update_time: string;
  user_id: number;
  bank_id: number;
  bank_name: string;
  bank_account: string;
  bank_no: string;
}

declare interface QueryUserWalletBankVO {
  list: {
  id: number;
  create_time: string;
  update_time: string;
  user_id: number;
  bank_id: number;
  bank_name: string;
  bank_account: string;
  bank_no: string;
}[];
}

declare interface DoBindWalletBankDTO {
  bank_account: string;
  bank_no: string;
  bank_name: string;
}

declare interface DoRemoveWalletBankDTO {
  id: number;
}

declare interface SetWalletPasswordDTO {
  password: string;
}

declare interface DoWalletWithdrawDto {
  password: string;
  amount: number;
}

declare interface DoWalletRechargeDTO {
  amount: number;
}

declare interface QueryNavListDto {

}

declare interface ArticleEntity {
  id: number;
  create_time: string;
  update_time: string;
  pid: number;
  name: string;
  content: string;
  is_nav: number;
  nav_id: number;
  is_folder: number;
}

declare interface QueryNavListVo {
  list: {
  id: number;
  create_time: string;
  update_time: string;
  pid: number;
  name: string;
  content: string;
  is_nav: number;
  nav_id: number;
  is_folder: number;
}[];
}

declare interface QueryTagsDto {

}

declare interface QueryChildrenDto {
  id?: number;
  name?: string;
  is_nav?: number;
  is_folder?: number;
}

declare interface QueryChildrenVo {
  list: {
  id: number;
  create_time: string;
  update_time: string;
  pid: number;
  name: string;
  content: string;
  is_nav: number;
  nav_id: number;
  is_folder: number;
}[];
}

declare interface QueryArticleDetail {

}


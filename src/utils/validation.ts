/**
 * 金额格式验证
 * @param value
 * @returns
 */
export const checkMoney = (value: string) =>
  /^(([0-9]|([1-9][0-9]{0,9}))((\\.[0-9]{1,2})?))$/.test(value)

/**
 * 邮箱格式验证
 * @param value
 * @returns
 */
export const checkEmail = (value: string) =>
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
    value
  )

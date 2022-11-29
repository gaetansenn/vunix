import { autofocusAttr, disabledAttr, downloadAttr, formactionAttr, formAttr, hrefAttr, hrefLangAttr, nameAttr, relAttr, targetAttr } from './attrs'

export type ButtonFormenctypeAttrType = 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain'
export type ButtonTypeAttrType = 'button' | 'reset' | 'submit'
export const buttonTag = {
  ...autofocusAttr,
  ...disabledAttr,
  ...formAttr,
  ...formactionAttr,
  /**
   * @description The formenctype attribute specifies how form-data should be encoded before sending it to a server. This attribute overrides the form's enctype attribute.
   * The formenctype attribute is only used for buttons with type="submit".
   * @type {String}
   * @values application/x-www-form-urlencoded|multipart/form-data|text/plain
   * @see https://www.w3schools.com/tags/att_button_formenctype.asp
  */
  formenctype: {
    type: String,
    default: undefined,
    validator: (prop: ButtonFormenctypeAttrType) => [
      'application/x-www-form-urlencoded',
      'multipart/form-data',
      'text/plain',
    ].includes(prop)
  },
  /**
   * @description The formtarget attribute specifies where to display the response after submitting the form. This attribute overrides the form's target attribute.
   * @type {String}
   * @values _blank|_self|_parent|_top|framename
   * @see https://www.w3schools.com/tags/att_button_formtarget.asp
  */
  formtarget: targetAttr.target,
  /**
   * @description The name attribute specifies the name for a <button> element.
   * The name attribute is used to reference form-data after the form has been submitted, or to reference the element in a JavaScript.
   * @type {String}
   * @see https://www.w3schools.com/tags/att_button_name.asp
  */
  ...nameAttr,
  /**
   * @description The type attribute specifies the type of button.
   * Always specify the type attribute for the <button> element. Different browsers may use different default types for the <button> element.
   * @type {String}
   * @see https://www.w3schools.com/tags/att_button_type.asp
  */
  type: {
    type: String,
    default: undefined,
    validator: (prop: ButtonTypeAttrType) => [
      'button',
      'reset',
      'submit',
    ].includes(prop)
  },
  /**
   * @description The value attribute specifies the initial value for a <button> in an HTML form.
   * In a form, the button and its value is only submitted if the button itself was used to submit the form.
   * @type {String}
   * @see https://www.w3schools.com/tags/att_button_value.asp
  */
  value: {
    type: String,
    default: undefined,
  }
}

export type ReferrerpolicyAttrType = 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url'

/**
 * @description The <a> tag defines a hyperlink, which is used to link from one page to another.
 * @see https://www.w3schools.com/tags/tag_a.asp
 */
export const aTag = {
  ...downloadAttr,
  ...hrefAttr,
  ...hrefLangAttr,
  /**
   * @description The media attribute specifies what media or device the linked document is optimized for.
   * This attribute is used to specify that the target URL is designed for special devices (like iPhone), speech or print media.
   * This attribute can accept several values.
   * @type {String}
   * @values Please refer to https://www.w3schools.com/tags/att_a_media.asp
   * @see https://www.w3schools.com/tags/att_a_media.asp
  */
  media: {
    type: String,
    default: undefined
  },
  /**
   * @description The ping attribute specifies a list of URLs to be notified if the user follows the hyperlink.
   * When the user clicks on the hyperlink, the ping attribute will send a short HTTP POST request to the specified URL.
   * This attribute is useful for monitoring/tracking.
   * @type {String}
   * @values Specifies the URL to be notified if the user follows the hyperlink. Must be a space separated list of one or more valid URLs
   * To view all available language codes, go https://www.w3schools.com/tags/ref_language_codes.asp
   * @see https://www.w3schools.com/tags/att_a_ping.asp
   */
  ping: {
    type: String,
    default: undefined
  },
  /**
   * @description The referrerpolicy attribute specifies which referrer information to send when the user clicks on the hyperlink.
   * @type {String}
   * @values no-referrer|no-referrer-when-downgrade|origin|origin-when-cross-origin|same-origin|strict-origin-when-cross-origin|unsafe-url
   * @see https://www.w3schools.com/tags/att_a_referrepolicy.asp
   */
  referrerpolicy: {
    type: String,
    default: undefined,
    validator: (prop: ReferrerpolicyAttrType) => [
      'no-referrer',
      'no-referrer-when-downgrade',
      'origin',
      'origin-when-cross-origin',
      'same-origin',
      'strict-origin-when-cross-origin',
      'unsafe-url'
    ].includes(prop)
  },
  ...relAttr,
  ...targetAttr,
  /**
   * @description The type attribute specifies the Internet media type (formerly known as MIME type) of the linked document.
   * @type {String}
   * @values Look at http://www.iana.org/assignments/media-types/ for a complete list of standard media types.
   * @see https://www.w3schools.com/tags/att_a_type.asp
   */
  type: {
    type: String,
    default: undefined
  }
}

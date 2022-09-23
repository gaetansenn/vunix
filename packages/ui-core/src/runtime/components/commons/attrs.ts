export const idAttr = {
  /**
   * @description The id global attribute defines an identifier (ID) which must be unique in the whole document.
   * Its purpose is to identify the element when linking (using a fragment identifier), scripting, or styling (with CSS).
   * @type {String}
   * @see https://www.w3schools.com/tags/att_name.asp
  */
  id: {
    type: String,
    required: true,
    /**
     * @description Technically, the value for an id attribute may contain any character, except whitespace characters.
     * However, to avoid inadvertent errors, only ASCII letters, digits, '_', and '-' should be used and the value for an id attribute should start with a letter. For example, . has a special meaning in CSS (it acts as a class selector). Unless you are careful to escape it in the CSS, it won't be recognized as part of the value of an id attribute.
     * It is easy to forget to do this, resulting in bugs in your code that could be hard to detect.
     * @param prop
     * @returns
     */
    validator: (prop: string) => /^[A-Za-z]+[\w\-\:\.]*$/.test(prop)
  }
}

export const nameAttr = {
  /**
   * @description The name attribute specifies a name for an HTML element.
   * This name attribute can be used to reference the element in a JavaScript.
   * @type {String}
   * @see https://www.w3schools.com/tags/att_name.asp
  */
  name: {
    type: String,
    default: undefined
  }
}

export const formactionAttr = {
  /**
   * @description The formaction attribute specifies where to send the form-data when a form is submitted. This attribute overrides the form's action attribute.
   * The formaction attribute is only used for buttons with type="submit".
   * @see https://www.w3schools.com/tags/att_button_formaction.asp
  */
  formaction: {
    type: String, // TODO: change type as url typing and use validator ?,
    default: undefined
  }
}

export const formAttr = {
  /**
   * @description The form attribute specifies the form the button belongs to.
   * The value of this attribute must be equal to the id attribute of a <form> element in the same document.
   * @see https://www.w3schools.com/tags/att_button_form.asp
  */
  form: {
    type: String,
    default: undefined
  }
}

export const disabledAttr = {
  /**
   * @description The disabled attribute is a boolean attribute.
   * When present, it specifies that the button should be disabled.
   * A disabled button is unusable and un-clickable.
   * @see https://www.w3schools.com/tags/att_button_disabled.asp
  */
  disabled: {
    type: Boolean,
    default: undefined
  }
}

export const autofocusAttr = {
  /**
   * @description The autofocus attribute is a boolean attribute.
   * When present, it specifies that a button should automatically get focus when the page loads.
   * @see https://www.w3schools.com/tags/att_button_autofocus.asp
  */
  autofocus: {
    type: Boolean,
    default: undefined
  }
}

/**
 * @type {{ href: string }}
 * */
export const hrefAttr = {
  /**
   * @description The href attribute specifies the URL of the page the link goes to.
   * @see https://www.w3schools.com/tags/att_a_href.asp
  */
  href: {
    type: String,
    default: undefined
  }
}

export const downloadAttr = {
  /**
   * @description Download file when clicking on the link (instead of navigating to the file)
   * @type {String}
   * @values Optional. Specifies the new filename for the downloaded file
   * @see https://www.w3schools.com/tags/att_a_download.asp
  */
  download: {
    type: String,
    default: undefined
  }
}

export const hrefLangAttr = {
  /**
   * @description The hreflang attribute specifies the language of the document in the link
   * @type {String}
   * @values A two-letter language code that specifies the language of the linked document.
   * To view all available language codes, go https://www.w3schools.com/tags/ref_language_codes.asp
   * @see https://www.w3schools.com/tags/att_a_hreflang.asp
  */
  hreflang: {
    type: String,
    default: undefined
  }
}

export type TargetAttrType = '_blank' | '_self' | '_parent' | '_top' | 'framename'
export const targetAttr = {
  /**
   * @description The target attribute specifies where to open the linked document.
   * @type {String}
   * @values _blank|_self|_parent|_top|framename
   * @see https://www.w3schools.com/tags/att_a_target.asp
  */
  target: {
    type: String,
    default: undefined,
    validator: (prop: TargetAttrType) => [
      '_blank',
      '_self',
      '_parent',
      '_top',
      'framename'
    ].includes(prop)
  }
}

export type RelAttrType = 'alternate' | 'author' | 'bookmark' | 'external' | 'help' | 'license' | 'next' | 'nofollow' | 'noopener' | 'noreferrer' | 'prev' | 'search' | 'tag'
export const relAttr = {
  /**
   * @description The rel attribute specifies the relationship between the current document and the linked document.
   * Only used if the href attribute is present.
   * @type {String}
   * @values alternate|author|bookmark|external|help|license|next|nofollow|noopener|noreferrer|prev|search|tag
   * @see https://www.w3schools.com/tags/att_a_rel.asp
  */
  rel: {
    type: String,
    default: undefined,
    validator: (prop: RelAttrType) => [
      'alternate',
      'author',
      'bookmark',
      'external',
      'help',
      'license',
      'next',
      'nofollow',
      'noopener',
      'noreferrer',
      'prev',
      'search',
      'tag'
    ].includes(prop)
  }
}

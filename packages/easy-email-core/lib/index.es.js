var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import React, { useContext, useMemo } from "react";
import { omit, merge, isObject, isString, get, mergeWith, isArray, set, unescape, isNumber } from "lodash";
import { renderToStaticMarkup } from "react-dom/server";
import { v4 } from "uuid";
var BasicType = /* @__PURE__ */ ((BasicType2) => {
  BasicType2["PAGE"] = "page";
  BasicType2["SECTION"] = "section";
  BasicType2["COLUMN"] = "column";
  BasicType2["GROUP"] = "group";
  BasicType2["TEXT"] = "text";
  BasicType2["IMAGE"] = "image";
  BasicType2["DIVIDER"] = "divider";
  BasicType2["SPACER"] = "spacer";
  BasicType2["BUTTON"] = "button";
  BasicType2["WRAPPER"] = "wrapper";
  BasicType2["RAW"] = "raw";
  BasicType2["ACCORDION"] = "accordion";
  BasicType2["ACCORDION_ELEMENT"] = "accordion-element";
  BasicType2["ACCORDION_TITLE"] = "accordion-title";
  BasicType2["ACCORDION_TEXT"] = "accordion-text";
  BasicType2["HERO"] = "hero";
  BasicType2["CAROUSEL"] = "carousel";
  BasicType2["NAVBAR"] = "navbar";
  BasicType2["SOCIAL"] = "social";
  BasicType2["TABLE"] = "table";
  BasicType2["TEMPLATE"] = "template";
  return BasicType2;
})(BasicType || {});
var AdvancedType = /* @__PURE__ */ ((AdvancedType2) => {
  AdvancedType2["TEXT"] = "advanced_text";
  AdvancedType2["IMAGE"] = "advanced_image";
  AdvancedType2["DIVIDER"] = "advanced_divider";
  AdvancedType2["SPACER"] = "advanced_spacer";
  AdvancedType2["BUTTON"] = "advanced_button";
  AdvancedType2["NAVBAR"] = "advanced_navbar";
  AdvancedType2["SOCIAL"] = "advanced_social";
  AdvancedType2["ACCORDION"] = "advanced_accordion";
  AdvancedType2["CAROUSEL"] = "advanced_carousel";
  AdvancedType2["TABLE"] = "advanced_table";
  AdvancedType2["WRAPPER"] = "advanced_wrapper";
  AdvancedType2["SECTION"] = "advanced_section";
  AdvancedType2["COLUMN"] = "advanced_column";
  AdvancedType2["GROUP"] = "advanced_group";
  AdvancedType2["HERO"] = "advanced_hero";
  return AdvancedType2;
})(AdvancedType || {});
const MERGE_TAG_CLASS_NAME = "easy-email-merge-tag-container";
const EMAIL_BLOCK_CLASS_NAME = "email-block";
function createBlock(block) {
  return block;
}
class ImageManager {
  static add(imgMap) {
    Object.keys(imgMap).forEach((name) => {
      if (this.map[name]) {
        this.overrideMap[name] = true;
      }
      this.map[name] = imgMap[name];
    });
  }
  static get(name) {
    return this.map[name];
  }
  static getOverrideMap() {
    return this.overrideMap;
  }
}
ImageManager.map = {};
ImageManager.overrideMap = {};
const PLACEHOLDER = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="#f0f0f0"/><text x="300" y="200" text-anchor="middle" dominant-baseline="central" fill="#999" font-family="sans-serif" font-size="18">Placeholder</text></svg>'
)}`;
const defaultImagesMap = {
  IMAGE_01: PLACEHOLDER,
  IMAGE_02: PLACEHOLDER,
  IMAGE_03: PLACEHOLDER,
  IMAGE_04: PLACEHOLDER,
  IMAGE_59: PLACEHOLDER,
  IMAGE_09: PLACEHOLDER,
  IMAGE_10: PLACEHOLDER,
  IMAGE_15: PLACEHOLDER,
  IMAGE_16: PLACEHOLDER,
  IMAGE_17: PLACEHOLDER,
  IMAGE_31: PLACEHOLDER
};
ImageManager.add(defaultImagesMap);
function getImg(name) {
  return ImageManager.get(name);
}
function getPlaceholder(params) {
  const { data: { type }, mode } = params;
  if (mode === "production")
    return null;
  let text = null;
  if (type === BasicType.PAGE) {
    text = "Drop a Wrapper block here";
  } else if (type === BasicType.WRAPPER || type === AdvancedType.WRAPPER) {
    text = "Drop a Section block here";
  } else if (type === BasicType.SECTION || type === BasicType.GROUP || type === AdvancedType.SECTION || type === AdvancedType.GROUP) {
    text = "Drop a Column block here";
  } else if (type === BasicType.COLUMN || type === AdvancedType.COLUMN) {
    text = "Drop a content block here";
  }
  if (!text)
    return null;
  return `
   <mj-text color="#666">
    <div style="text-align: center">
      <div>
        <svg width="300" fill="currentColor" style="max-width: 100%;" viewBox="-20 -5 80 60">
          <g>
            <path d="M23.713 23.475h5.907c.21 0 .38.17.38.38v.073c0 .21-.17.38-.38.38h-5.907a.38.38 0 0 1-.38-.38v-.073c0-.21.17-.38.38-.38zm.037-2.917h9.167a.417.417 0 0 1 0 .834H23.75a.417.417 0 0 1 0-.834zm0-2.5h9.167a.417.417 0 0 1 0 .834H23.75a.417.417 0 0 1 0-.834zm-.037-3.333h5.907c.21 0 .38.17.38.38v.073c0 .21-.17.38-.38.38h-5.907a.38.38 0 0 1-.38-.38v-.073c0-.21.17-.38.38-.38zm.037-2.917h9.167a.417.417 0 0 1 0 .834H23.75a.417.417 0 0 1 0-.834zm0-2.916h9.167a.417.417 0 0 1 0 .833H23.75a.417.417 0 0 1 0-.833zm-3.592 8.75a.675.675 0 0 1 .675.691v6.142c0 .374-.3.679-.675.683h-6.15a.683.683 0 0 1-.675-.683v-6.142a.675.675 0 0 1 .675-.691h6.15zM20 24.308v-5.833h-5.833v5.833H20zm.158-15.833a.675.675 0 0 1 .675.692v6.141c0 .374-.3.68-.675.684h-6.15a.683.683 0 0 1-.675-.684V9.167a.675.675 0 0 1 .675-.692h6.15zM20 15.142V9.308h-5.833v5.834H20zM37.167 0A2.809 2.809 0 0 1 40 2.833V30.5a2.809 2.809 0 0 1-2.833 2.833h-3.834v3H32.5v-3h-23A2.808 2.808 0 0 1 6.667 30.5v-23H3.583v-.833h3.084V2.833A2.808 2.808 0 0 1 9.5 0h27.667zm2 30.5V2.833a2.025 2.025 0 0 0-2-2H9.5a2.025 2.025 0 0 0-2 2V30.5a2.025 2.025 0 0 0 2 2h27.667a2.025 2.025 0 0 0 2-2zM0 27.75h.833V31H0v-3.25zm0-13h.833V18H0v-3.25zm0 22.833V34.25h.833v3.25L0 37.583zM0 21.25h.833v3.25H0v-3.25zM2.583 40l.084-.833h3.166V40h-3.25zm27.917-.833c.376.006.748-.08 1.083-.25l.417.666a2.875 2.875 0 0 1-1.5.417h-1.833v-.833H30.5zm-8.333 0h3.25V40h-3.25v-.833zm-6.584 0h3.25V40h-3.25v-.833zm-6.5 0h3.25V40h-3.25v-.833zM0 9.5c.01-.5.154-.99.417-1.417l.666.417c-.17.305-.256.65-.25 1v2H0v-2z"></path>
          </g>
          <text x="-16" y="50" font-size="5px">${text}</text>
        </svg>
      </div>
    </div>
   </mj-text>
  `;
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var js = { exports: {} };
var src = {};
var javascript = { exports: {} };
var beautifier$2 = {};
var output = {};
function OutputLine(parent) {
  this.__parent = parent;
  this.__character_count = 0;
  this.__indent_count = -1;
  this.__alignment_count = 0;
  this.__wrap_point_index = 0;
  this.__wrap_point_character_count = 0;
  this.__wrap_point_indent_count = -1;
  this.__wrap_point_alignment_count = 0;
  this.__items = [];
}
OutputLine.prototype.clone_empty = function() {
  var line = new OutputLine(this.__parent);
  line.set_indent(this.__indent_count, this.__alignment_count);
  return line;
};
OutputLine.prototype.item = function(index2) {
  if (index2 < 0) {
    return this.__items[this.__items.length + index2];
  } else {
    return this.__items[index2];
  }
};
OutputLine.prototype.has_match = function(pattern2) {
  for (var lastCheckedOutput = this.__items.length - 1; lastCheckedOutput >= 0; lastCheckedOutput--) {
    if (this.__items[lastCheckedOutput].match(pattern2)) {
      return true;
    }
  }
  return false;
};
OutputLine.prototype.set_indent = function(indent, alignment) {
  if (this.is_empty()) {
    this.__indent_count = indent || 0;
    this.__alignment_count = alignment || 0;
    this.__character_count = this.__parent.get_indent_size(this.__indent_count, this.__alignment_count);
  }
};
OutputLine.prototype._set_wrap_point = function() {
  if (this.__parent.wrap_line_length) {
    this.__wrap_point_index = this.__items.length;
    this.__wrap_point_character_count = this.__character_count;
    this.__wrap_point_indent_count = this.__parent.next_line.__indent_count;
    this.__wrap_point_alignment_count = this.__parent.next_line.__alignment_count;
  }
};
OutputLine.prototype._should_wrap = function() {
  return this.__wrap_point_index && this.__character_count > this.__parent.wrap_line_length && this.__wrap_point_character_count > this.__parent.next_line.__character_count;
};
OutputLine.prototype._allow_wrap = function() {
  if (this._should_wrap()) {
    this.__parent.add_new_line();
    var next = this.__parent.current_line;
    next.set_indent(this.__wrap_point_indent_count, this.__wrap_point_alignment_count);
    next.__items = this.__items.slice(this.__wrap_point_index);
    this.__items = this.__items.slice(0, this.__wrap_point_index);
    next.__character_count += this.__character_count - this.__wrap_point_character_count;
    this.__character_count = this.__wrap_point_character_count;
    if (next.__items[0] === " ") {
      next.__items.splice(0, 1);
      next.__character_count -= 1;
    }
    return true;
  }
  return false;
};
OutputLine.prototype.is_empty = function() {
  return this.__items.length === 0;
};
OutputLine.prototype.last = function() {
  if (!this.is_empty()) {
    return this.__items[this.__items.length - 1];
  } else {
    return null;
  }
};
OutputLine.prototype.push = function(item) {
  this.__items.push(item);
  var last_newline_index = item.lastIndexOf("\n");
  if (last_newline_index !== -1) {
    this.__character_count = item.length - last_newline_index;
  } else {
    this.__character_count += item.length;
  }
};
OutputLine.prototype.pop = function() {
  var item = null;
  if (!this.is_empty()) {
    item = this.__items.pop();
    this.__character_count -= item.length;
  }
  return item;
};
OutputLine.prototype._remove_indent = function() {
  if (this.__indent_count > 0) {
    this.__indent_count -= 1;
    this.__character_count -= this.__parent.indent_size;
  }
};
OutputLine.prototype._remove_wrap_indent = function() {
  if (this.__wrap_point_indent_count > 0) {
    this.__wrap_point_indent_count -= 1;
  }
};
OutputLine.prototype.trim = function() {
  while (this.last() === " ") {
    this.__items.pop();
    this.__character_count -= 1;
  }
};
OutputLine.prototype.toString = function() {
  var result = "";
  if (this.is_empty()) {
    if (this.__parent.indent_empty_lines) {
      result = this.__parent.get_indent_string(this.__indent_count);
    }
  } else {
    result = this.__parent.get_indent_string(this.__indent_count, this.__alignment_count);
    result += this.__items.join("");
  }
  return result;
};
function IndentStringCache(options2, baseIndentString) {
  this.__cache = [""];
  this.__indent_size = options2.indent_size;
  this.__indent_string = options2.indent_char;
  if (!options2.indent_with_tabs) {
    this.__indent_string = new Array(options2.indent_size + 1).join(options2.indent_char);
  }
  baseIndentString = baseIndentString || "";
  if (options2.indent_level > 0) {
    baseIndentString = new Array(options2.indent_level + 1).join(this.__indent_string);
  }
  this.__base_string = baseIndentString;
  this.__base_string_length = baseIndentString.length;
}
IndentStringCache.prototype.get_indent_size = function(indent, column) {
  var result = this.__base_string_length;
  column = column || 0;
  if (indent < 0) {
    result = 0;
  }
  result += indent * this.__indent_size;
  result += column;
  return result;
};
IndentStringCache.prototype.get_indent_string = function(indent_level, column) {
  var result = this.__base_string;
  column = column || 0;
  if (indent_level < 0) {
    indent_level = 0;
    result = "";
  }
  column += indent_level * this.__indent_size;
  this.__ensure_cache(column);
  result += this.__cache[column];
  return result;
};
IndentStringCache.prototype.__ensure_cache = function(column) {
  while (column >= this.__cache.length) {
    this.__add_column();
  }
};
IndentStringCache.prototype.__add_column = function() {
  var column = this.__cache.length;
  var indent = 0;
  var result = "";
  if (this.__indent_size && column >= this.__indent_size) {
    indent = Math.floor(column / this.__indent_size);
    column -= indent * this.__indent_size;
    result = new Array(indent + 1).join(this.__indent_string);
  }
  if (column) {
    result += new Array(column + 1).join(" ");
  }
  this.__cache.push(result);
};
function Output$3(options2, baseIndentString) {
  this.__indent_cache = new IndentStringCache(options2, baseIndentString);
  this.raw = false;
  this._end_with_newline = options2.end_with_newline;
  this.indent_size = options2.indent_size;
  this.wrap_line_length = options2.wrap_line_length;
  this.indent_empty_lines = options2.indent_empty_lines;
  this.__lines = [];
  this.previous_line = null;
  this.current_line = null;
  this.next_line = new OutputLine(this);
  this.space_before_token = false;
  this.non_breaking_space = false;
  this.previous_token_wrapped = false;
  this.__add_outputline();
}
Output$3.prototype.__add_outputline = function() {
  this.previous_line = this.current_line;
  this.current_line = this.next_line.clone_empty();
  this.__lines.push(this.current_line);
};
Output$3.prototype.get_line_number = function() {
  return this.__lines.length;
};
Output$3.prototype.get_indent_string = function(indent, column) {
  return this.__indent_cache.get_indent_string(indent, column);
};
Output$3.prototype.get_indent_size = function(indent, column) {
  return this.__indent_cache.get_indent_size(indent, column);
};
Output$3.prototype.is_empty = function() {
  return !this.previous_line && this.current_line.is_empty();
};
Output$3.prototype.add_new_line = function(force_newline) {
  if (this.is_empty() || !force_newline && this.just_added_newline()) {
    return false;
  }
  if (!this.raw) {
    this.__add_outputline();
  }
  return true;
};
Output$3.prototype.get_code = function(eol) {
  this.trim(true);
  var last_item = this.current_line.pop();
  if (last_item) {
    if (last_item[last_item.length - 1] === "\n") {
      last_item = last_item.replace(/\n+$/g, "");
    }
    this.current_line.push(last_item);
  }
  if (this._end_with_newline) {
    this.__add_outputline();
  }
  var sweet_code = this.__lines.join("\n");
  if (eol !== "\n") {
    sweet_code = sweet_code.replace(/[\n]/g, eol);
  }
  return sweet_code;
};
Output$3.prototype.set_wrap_point = function() {
  this.current_line._set_wrap_point();
};
Output$3.prototype.set_indent = function(indent, alignment) {
  indent = indent || 0;
  alignment = alignment || 0;
  this.next_line.set_indent(indent, alignment);
  if (this.__lines.length > 1) {
    this.current_line.set_indent(indent, alignment);
    return true;
  }
  this.current_line.set_indent();
  return false;
};
Output$3.prototype.add_raw_token = function(token2) {
  for (var x = 0; x < token2.newlines; x++) {
    this.__add_outputline();
  }
  this.current_line.set_indent(-1);
  this.current_line.push(token2.whitespace_before);
  this.current_line.push(token2.text);
  this.space_before_token = false;
  this.non_breaking_space = false;
  this.previous_token_wrapped = false;
};
Output$3.prototype.add_token = function(printable_token) {
  this.__add_space_before_token();
  this.current_line.push(printable_token);
  this.space_before_token = false;
  this.non_breaking_space = false;
  this.previous_token_wrapped = this.current_line._allow_wrap();
};
Output$3.prototype.__add_space_before_token = function() {
  if (this.space_before_token && !this.just_added_newline()) {
    if (!this.non_breaking_space) {
      this.set_wrap_point();
    }
    this.current_line.push(" ");
  }
};
Output$3.prototype.remove_indent = function(index2) {
  var output_length = this.__lines.length;
  while (index2 < output_length) {
    this.__lines[index2]._remove_indent();
    index2++;
  }
  this.current_line._remove_wrap_indent();
};
Output$3.prototype.trim = function(eat_newlines) {
  eat_newlines = eat_newlines === void 0 ? false : eat_newlines;
  this.current_line.trim();
  while (eat_newlines && this.__lines.length > 1 && this.current_line.is_empty()) {
    this.__lines.pop();
    this.current_line = this.__lines[this.__lines.length - 1];
    this.current_line.trim();
  }
  this.previous_line = this.__lines.length > 1 ? this.__lines[this.__lines.length - 2] : null;
};
Output$3.prototype.just_added_newline = function() {
  return this.current_line.is_empty();
};
Output$3.prototype.just_added_blankline = function() {
  return this.is_empty() || this.current_line.is_empty() && this.previous_line.is_empty();
};
Output$3.prototype.ensure_empty_line_above = function(starts_with, ends_with) {
  var index2 = this.__lines.length - 2;
  while (index2 >= 0) {
    var potentialEmptyLine = this.__lines[index2];
    if (potentialEmptyLine.is_empty()) {
      break;
    } else if (potentialEmptyLine.item(0).indexOf(starts_with) !== 0 && potentialEmptyLine.item(-1) !== ends_with) {
      this.__lines.splice(index2 + 1, 0, new OutputLine(this));
      this.previous_line = this.__lines[this.__lines.length - 2];
      break;
    }
    index2--;
  }
};
output.Output = Output$3;
var token = {};
function Token$2(type, text, newlines, whitespace_before) {
  this.type = type;
  this.text = text;
  this.comments_before = null;
  this.newlines = newlines || 0;
  this.whitespace_before = whitespace_before || "";
  this.parent = null;
  this.next = null;
  this.previous = null;
  this.opened = null;
  this.closed = null;
  this.directives = null;
}
token.Token = Token$2;
var acorn$2 = {};
(function(exports) {
  var baseASCIIidentifierStartChars = "\\x23\\x24\\x40\\x41-\\x5a\\x5f\\x61-\\x7a";
  var baseASCIIidentifierChars = "\\x24\\x30-\\x39\\x41-\\x5a\\x5f\\x61-\\x7a";
  var nonASCIIidentifierStartChars = "\\xaa\\xb5\\xba\\xc0-\\xd6\\xd8-\\xf6\\xf8-\\u02c1\\u02c6-\\u02d1\\u02e0-\\u02e4\\u02ec\\u02ee\\u0370-\\u0374\\u0376\\u0377\\u037a-\\u037d\\u0386\\u0388-\\u038a\\u038c\\u038e-\\u03a1\\u03a3-\\u03f5\\u03f7-\\u0481\\u048a-\\u0527\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05d0-\\u05ea\\u05f0-\\u05f2\\u0620-\\u064a\\u066e\\u066f\\u0671-\\u06d3\\u06d5\\u06e5\\u06e6\\u06ee\\u06ef\\u06fa-\\u06fc\\u06ff\\u0710\\u0712-\\u072f\\u074d-\\u07a5\\u07b1\\u07ca-\\u07ea\\u07f4\\u07f5\\u07fa\\u0800-\\u0815\\u081a\\u0824\\u0828\\u0840-\\u0858\\u08a0\\u08a2-\\u08ac\\u0904-\\u0939\\u093d\\u0950\\u0958-\\u0961\\u0971-\\u0977\\u0979-\\u097f\\u0985-\\u098c\\u098f\\u0990\\u0993-\\u09a8\\u09aa-\\u09b0\\u09b2\\u09b6-\\u09b9\\u09bd\\u09ce\\u09dc\\u09dd\\u09df-\\u09e1\\u09f0\\u09f1\\u0a05-\\u0a0a\\u0a0f\\u0a10\\u0a13-\\u0a28\\u0a2a-\\u0a30\\u0a32\\u0a33\\u0a35\\u0a36\\u0a38\\u0a39\\u0a59-\\u0a5c\\u0a5e\\u0a72-\\u0a74\\u0a85-\\u0a8d\\u0a8f-\\u0a91\\u0a93-\\u0aa8\\u0aaa-\\u0ab0\\u0ab2\\u0ab3\\u0ab5-\\u0ab9\\u0abd\\u0ad0\\u0ae0\\u0ae1\\u0b05-\\u0b0c\\u0b0f\\u0b10\\u0b13-\\u0b28\\u0b2a-\\u0b30\\u0b32\\u0b33\\u0b35-\\u0b39\\u0b3d\\u0b5c\\u0b5d\\u0b5f-\\u0b61\\u0b71\\u0b83\\u0b85-\\u0b8a\\u0b8e-\\u0b90\\u0b92-\\u0b95\\u0b99\\u0b9a\\u0b9c\\u0b9e\\u0b9f\\u0ba3\\u0ba4\\u0ba8-\\u0baa\\u0bae-\\u0bb9\\u0bd0\\u0c05-\\u0c0c\\u0c0e-\\u0c10\\u0c12-\\u0c28\\u0c2a-\\u0c33\\u0c35-\\u0c39\\u0c3d\\u0c58\\u0c59\\u0c60\\u0c61\\u0c85-\\u0c8c\\u0c8e-\\u0c90\\u0c92-\\u0ca8\\u0caa-\\u0cb3\\u0cb5-\\u0cb9\\u0cbd\\u0cde\\u0ce0\\u0ce1\\u0cf1\\u0cf2\\u0d05-\\u0d0c\\u0d0e-\\u0d10\\u0d12-\\u0d3a\\u0d3d\\u0d4e\\u0d60\\u0d61\\u0d7a-\\u0d7f\\u0d85-\\u0d96\\u0d9a-\\u0db1\\u0db3-\\u0dbb\\u0dbd\\u0dc0-\\u0dc6\\u0e01-\\u0e30\\u0e32\\u0e33\\u0e40-\\u0e46\\u0e81\\u0e82\\u0e84\\u0e87\\u0e88\\u0e8a\\u0e8d\\u0e94-\\u0e97\\u0e99-\\u0e9f\\u0ea1-\\u0ea3\\u0ea5\\u0ea7\\u0eaa\\u0eab\\u0ead-\\u0eb0\\u0eb2\\u0eb3\\u0ebd\\u0ec0-\\u0ec4\\u0ec6\\u0edc-\\u0edf\\u0f00\\u0f40-\\u0f47\\u0f49-\\u0f6c\\u0f88-\\u0f8c\\u1000-\\u102a\\u103f\\u1050-\\u1055\\u105a-\\u105d\\u1061\\u1065\\u1066\\u106e-\\u1070\\u1075-\\u1081\\u108e\\u10a0-\\u10c5\\u10c7\\u10cd\\u10d0-\\u10fa\\u10fc-\\u1248\\u124a-\\u124d\\u1250-\\u1256\\u1258\\u125a-\\u125d\\u1260-\\u1288\\u128a-\\u128d\\u1290-\\u12b0\\u12b2-\\u12b5\\u12b8-\\u12be\\u12c0\\u12c2-\\u12c5\\u12c8-\\u12d6\\u12d8-\\u1310\\u1312-\\u1315\\u1318-\\u135a\\u1380-\\u138f\\u13a0-\\u13f4\\u1401-\\u166c\\u166f-\\u167f\\u1681-\\u169a\\u16a0-\\u16ea\\u16ee-\\u16f0\\u1700-\\u170c\\u170e-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176c\\u176e-\\u1770\\u1780-\\u17b3\\u17d7\\u17dc\\u1820-\\u1877\\u1880-\\u18a8\\u18aa\\u18b0-\\u18f5\\u1900-\\u191c\\u1950-\\u196d\\u1970-\\u1974\\u1980-\\u19ab\\u19c1-\\u19c7\\u1a00-\\u1a16\\u1a20-\\u1a54\\u1aa7\\u1b05-\\u1b33\\u1b45-\\u1b4b\\u1b83-\\u1ba0\\u1bae\\u1baf\\u1bba-\\u1be5\\u1c00-\\u1c23\\u1c4d-\\u1c4f\\u1c5a-\\u1c7d\\u1ce9-\\u1cec\\u1cee-\\u1cf1\\u1cf5\\u1cf6\\u1d00-\\u1dbf\\u1e00-\\u1f15\\u1f18-\\u1f1d\\u1f20-\\u1f45\\u1f48-\\u1f4d\\u1f50-\\u1f57\\u1f59\\u1f5b\\u1f5d\\u1f5f-\\u1f7d\\u1f80-\\u1fb4\\u1fb6-\\u1fbc\\u1fbe\\u1fc2-\\u1fc4\\u1fc6-\\u1fcc\\u1fd0-\\u1fd3\\u1fd6-\\u1fdb\\u1fe0-\\u1fec\\u1ff2-\\u1ff4\\u1ff6-\\u1ffc\\u2071\\u207f\\u2090-\\u209c\\u2102\\u2107\\u210a-\\u2113\\u2115\\u2119-\\u211d\\u2124\\u2126\\u2128\\u212a-\\u212d\\u212f-\\u2139\\u213c-\\u213f\\u2145-\\u2149\\u214e\\u2160-\\u2188\\u2c00-\\u2c2e\\u2c30-\\u2c5e\\u2c60-\\u2ce4\\u2ceb-\\u2cee\\u2cf2\\u2cf3\\u2d00-\\u2d25\\u2d27\\u2d2d\\u2d30-\\u2d67\\u2d6f\\u2d80-\\u2d96\\u2da0-\\u2da6\\u2da8-\\u2dae\\u2db0-\\u2db6\\u2db8-\\u2dbe\\u2dc0-\\u2dc6\\u2dc8-\\u2dce\\u2dd0-\\u2dd6\\u2dd8-\\u2dde\\u2e2f\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303c\\u3041-\\u3096\\u309d-\\u309f\\u30a1-\\u30fa\\u30fc-\\u30ff\\u3105-\\u312d\\u3131-\\u318e\\u31a0-\\u31ba\\u31f0-\\u31ff\\u3400-\\u4db5\\u4e00-\\u9fcc\\ua000-\\ua48c\\ua4d0-\\ua4fd\\ua500-\\ua60c\\ua610-\\ua61f\\ua62a\\ua62b\\ua640-\\ua66e\\ua67f-\\ua697\\ua6a0-\\ua6ef\\ua717-\\ua71f\\ua722-\\ua788\\ua78b-\\ua78e\\ua790-\\ua793\\ua7a0-\\ua7aa\\ua7f8-\\ua801\\ua803-\\ua805\\ua807-\\ua80a\\ua80c-\\ua822\\ua840-\\ua873\\ua882-\\ua8b3\\ua8f2-\\ua8f7\\ua8fb\\ua90a-\\ua925\\ua930-\\ua946\\ua960-\\ua97c\\ua984-\\ua9b2\\ua9cf\\uaa00-\\uaa28\\uaa40-\\uaa42\\uaa44-\\uaa4b\\uaa60-\\uaa76\\uaa7a\\uaa80-\\uaaaf\\uaab1\\uaab5\\uaab6\\uaab9-\\uaabd\\uaac0\\uaac2\\uaadb-\\uaadd\\uaae0-\\uaaea\\uaaf2-\\uaaf4\\uab01-\\uab06\\uab09-\\uab0e\\uab11-\\uab16\\uab20-\\uab26\\uab28-\\uab2e\\uabc0-\\uabe2\\uac00-\\ud7a3\\ud7b0-\\ud7c6\\ud7cb-\\ud7fb\\uf900-\\ufa6d\\ufa70-\\ufad9\\ufb00-\\ufb06\\ufb13-\\ufb17\\ufb1d\\ufb1f-\\ufb28\\ufb2a-\\ufb36\\ufb38-\\ufb3c\\ufb3e\\ufb40\\ufb41\\ufb43\\ufb44\\ufb46-\\ufbb1\\ufbd3-\\ufd3d\\ufd50-\\ufd8f\\ufd92-\\ufdc7\\ufdf0-\\ufdfb\\ufe70-\\ufe74\\ufe76-\\ufefc\\uff21-\\uff3a\\uff41-\\uff5a\\uff66-\\uffbe\\uffc2-\\uffc7\\uffca-\\uffcf\\uffd2-\\uffd7\\uffda-\\uffdc";
  var nonASCIIidentifierChars = "\\u0300-\\u036f\\u0483-\\u0487\\u0591-\\u05bd\\u05bf\\u05c1\\u05c2\\u05c4\\u05c5\\u05c7\\u0610-\\u061a\\u0620-\\u0649\\u0672-\\u06d3\\u06e7-\\u06e8\\u06fb-\\u06fc\\u0730-\\u074a\\u0800-\\u0814\\u081b-\\u0823\\u0825-\\u0827\\u0829-\\u082d\\u0840-\\u0857\\u08e4-\\u08fe\\u0900-\\u0903\\u093a-\\u093c\\u093e-\\u094f\\u0951-\\u0957\\u0962-\\u0963\\u0966-\\u096f\\u0981-\\u0983\\u09bc\\u09be-\\u09c4\\u09c7\\u09c8\\u09d7\\u09df-\\u09e0\\u0a01-\\u0a03\\u0a3c\\u0a3e-\\u0a42\\u0a47\\u0a48\\u0a4b-\\u0a4d\\u0a51\\u0a66-\\u0a71\\u0a75\\u0a81-\\u0a83\\u0abc\\u0abe-\\u0ac5\\u0ac7-\\u0ac9\\u0acb-\\u0acd\\u0ae2-\\u0ae3\\u0ae6-\\u0aef\\u0b01-\\u0b03\\u0b3c\\u0b3e-\\u0b44\\u0b47\\u0b48\\u0b4b-\\u0b4d\\u0b56\\u0b57\\u0b5f-\\u0b60\\u0b66-\\u0b6f\\u0b82\\u0bbe-\\u0bc2\\u0bc6-\\u0bc8\\u0bca-\\u0bcd\\u0bd7\\u0be6-\\u0bef\\u0c01-\\u0c03\\u0c46-\\u0c48\\u0c4a-\\u0c4d\\u0c55\\u0c56\\u0c62-\\u0c63\\u0c66-\\u0c6f\\u0c82\\u0c83\\u0cbc\\u0cbe-\\u0cc4\\u0cc6-\\u0cc8\\u0cca-\\u0ccd\\u0cd5\\u0cd6\\u0ce2-\\u0ce3\\u0ce6-\\u0cef\\u0d02\\u0d03\\u0d46-\\u0d48\\u0d57\\u0d62-\\u0d63\\u0d66-\\u0d6f\\u0d82\\u0d83\\u0dca\\u0dcf-\\u0dd4\\u0dd6\\u0dd8-\\u0ddf\\u0df2\\u0df3\\u0e34-\\u0e3a\\u0e40-\\u0e45\\u0e50-\\u0e59\\u0eb4-\\u0eb9\\u0ec8-\\u0ecd\\u0ed0-\\u0ed9\\u0f18\\u0f19\\u0f20-\\u0f29\\u0f35\\u0f37\\u0f39\\u0f41-\\u0f47\\u0f71-\\u0f84\\u0f86-\\u0f87\\u0f8d-\\u0f97\\u0f99-\\u0fbc\\u0fc6\\u1000-\\u1029\\u1040-\\u1049\\u1067-\\u106d\\u1071-\\u1074\\u1082-\\u108d\\u108f-\\u109d\\u135d-\\u135f\\u170e-\\u1710\\u1720-\\u1730\\u1740-\\u1750\\u1772\\u1773\\u1780-\\u17b2\\u17dd\\u17e0-\\u17e9\\u180b-\\u180d\\u1810-\\u1819\\u1920-\\u192b\\u1930-\\u193b\\u1951-\\u196d\\u19b0-\\u19c0\\u19c8-\\u19c9\\u19d0-\\u19d9\\u1a00-\\u1a15\\u1a20-\\u1a53\\u1a60-\\u1a7c\\u1a7f-\\u1a89\\u1a90-\\u1a99\\u1b46-\\u1b4b\\u1b50-\\u1b59\\u1b6b-\\u1b73\\u1bb0-\\u1bb9\\u1be6-\\u1bf3\\u1c00-\\u1c22\\u1c40-\\u1c49\\u1c5b-\\u1c7d\\u1cd0-\\u1cd2\\u1d00-\\u1dbe\\u1e01-\\u1f15\\u200c\\u200d\\u203f\\u2040\\u2054\\u20d0-\\u20dc\\u20e1\\u20e5-\\u20f0\\u2d81-\\u2d96\\u2de0-\\u2dff\\u3021-\\u3028\\u3099\\u309a\\ua640-\\ua66d\\ua674-\\ua67d\\ua69f\\ua6f0-\\ua6f1\\ua7f8-\\ua800\\ua806\\ua80b\\ua823-\\ua827\\ua880-\\ua881\\ua8b4-\\ua8c4\\ua8d0-\\ua8d9\\ua8f3-\\ua8f7\\ua900-\\ua909\\ua926-\\ua92d\\ua930-\\ua945\\ua980-\\ua983\\ua9b3-\\ua9c0\\uaa00-\\uaa27\\uaa40-\\uaa41\\uaa4c-\\uaa4d\\uaa50-\\uaa59\\uaa7b\\uaae0-\\uaae9\\uaaf2-\\uaaf3\\uabc0-\\uabe1\\uabec\\uabed\\uabf0-\\uabf9\\ufb20-\\ufb28\\ufe00-\\ufe0f\\ufe20-\\ufe26\\ufe33\\ufe34\\ufe4d-\\ufe4f\\uff10-\\uff19\\uff3f";
  var unicodeEscapeOrCodePoint = "\\\\u[0-9a-fA-F]{4}|\\\\u\\{[0-9a-fA-F]+\\}";
  var identifierStart = "(?:" + unicodeEscapeOrCodePoint + "|[" + baseASCIIidentifierStartChars + nonASCIIidentifierStartChars + "])";
  var identifierChars = "(?:" + unicodeEscapeOrCodePoint + "|[" + baseASCIIidentifierChars + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "])*";
  exports.identifier = new RegExp(identifierStart + identifierChars, "g");
  exports.identifierStart = new RegExp(identifierStart);
  exports.identifierMatch = new RegExp("(?:" + unicodeEscapeOrCodePoint + "|[" + baseASCIIidentifierChars + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "])+");
  exports.newline = /[\n\r\u2028\u2029]/;
  exports.lineBreak = new RegExp("\r\n|" + exports.newline.source);
  exports.allLineBreaks = new RegExp(exports.lineBreak.source, "g");
})(acorn$2);
var options$3 = {};
var options$2 = {};
function Options$9(options2, merge_child_field) {
  this.raw_options = _mergeOpts(options2, merge_child_field);
  this.disabled = this._get_boolean("disabled");
  this.eol = this._get_characters("eol", "auto");
  this.end_with_newline = this._get_boolean("end_with_newline");
  this.indent_size = this._get_number("indent_size", 4);
  this.indent_char = this._get_characters("indent_char", " ");
  this.indent_level = this._get_number("indent_level");
  this.preserve_newlines = this._get_boolean("preserve_newlines", true);
  this.max_preserve_newlines = this._get_number("max_preserve_newlines", 32786);
  if (!this.preserve_newlines) {
    this.max_preserve_newlines = 0;
  }
  this.indent_with_tabs = this._get_boolean("indent_with_tabs", this.indent_char === "	");
  if (this.indent_with_tabs) {
    this.indent_char = "	";
    if (this.indent_size === 1) {
      this.indent_size = 4;
    }
  }
  this.wrap_line_length = this._get_number("wrap_line_length", this._get_number("max_char"));
  this.indent_empty_lines = this._get_boolean("indent_empty_lines");
  this.templating = this._get_selection_list("templating", ["auto", "none", "angular", "django", "erb", "handlebars", "php", "smarty"], ["auto"]);
}
Options$9.prototype._get_array = function(name, default_value) {
  var option_value = this.raw_options[name];
  var result = default_value || [];
  if (typeof option_value === "object") {
    if (option_value !== null && typeof option_value.concat === "function") {
      result = option_value.concat();
    }
  } else if (typeof option_value === "string") {
    result = option_value.split(/[^a-zA-Z0-9_\/\-]+/);
  }
  return result;
};
Options$9.prototype._get_boolean = function(name, default_value) {
  var option_value = this.raw_options[name];
  var result = option_value === void 0 ? !!default_value : !!option_value;
  return result;
};
Options$9.prototype._get_characters = function(name, default_value) {
  var option_value = this.raw_options[name];
  var result = default_value || "";
  if (typeof option_value === "string") {
    result = option_value.replace(/\\r/, "\r").replace(/\\n/, "\n").replace(/\\t/, "	");
  }
  return result;
};
Options$9.prototype._get_number = function(name, default_value) {
  var option_value = this.raw_options[name];
  default_value = parseInt(default_value, 10);
  if (isNaN(default_value)) {
    default_value = 0;
  }
  var result = parseInt(option_value, 10);
  if (isNaN(result)) {
    result = default_value;
  }
  return result;
};
Options$9.prototype._get_selection = function(name, selection_list, default_value) {
  var result = this._get_selection_list(name, selection_list, default_value);
  if (result.length !== 1) {
    throw new Error(
      "Invalid Option Value: The option '" + name + "' can only be one of the following values:\n" + selection_list + "\nYou passed in: '" + this.raw_options[name] + "'"
    );
  }
  return result[0];
};
Options$9.prototype._get_selection_list = function(name, selection_list, default_value) {
  if (!selection_list || selection_list.length === 0) {
    throw new Error("Selection list cannot be empty.");
  }
  default_value = default_value || [selection_list[0]];
  if (!this._is_valid_selection(default_value, selection_list)) {
    throw new Error("Invalid Default Value!");
  }
  var result = this._get_array(name, default_value);
  if (!this._is_valid_selection(result, selection_list)) {
    throw new Error(
      "Invalid Option Value: The option '" + name + "' can contain only the following values:\n" + selection_list + "\nYou passed in: '" + this.raw_options[name] + "'"
    );
  }
  return result;
};
Options$9.prototype._is_valid_selection = function(result, selection_list) {
  return result.length && selection_list.length && !result.some(function(item) {
    return selection_list.indexOf(item) === -1;
  });
};
function _mergeOpts(allOptions, childFieldName) {
  var finalOpts = {};
  allOptions = _normalizeOpts(allOptions);
  var name;
  for (name in allOptions) {
    if (name !== childFieldName) {
      finalOpts[name] = allOptions[name];
    }
  }
  if (childFieldName && allOptions[childFieldName]) {
    for (name in allOptions[childFieldName]) {
      finalOpts[name] = allOptions[childFieldName][name];
    }
  }
  return finalOpts;
}
function _normalizeOpts(options2) {
  var convertedOpts = {};
  var key;
  for (key in options2) {
    var newKey = key.replace(/-/g, "_");
    convertedOpts[newKey] = options2[key];
  }
  return convertedOpts;
}
options$2.Options = Options$9;
options$2.normalizeOpts = _normalizeOpts;
options$2.mergeOpts = _mergeOpts;
var BaseOptions$2 = options$2.Options;
var validPositionValues$1 = ["before-newline", "after-newline", "preserve-newline"];
function Options$8(options2) {
  BaseOptions$2.call(this, options2, "js");
  var raw_brace_style = this.raw_options.brace_style || null;
  if (raw_brace_style === "expand-strict") {
    this.raw_options.brace_style = "expand";
  } else if (raw_brace_style === "collapse-preserve-inline") {
    this.raw_options.brace_style = "collapse,preserve-inline";
  } else if (this.raw_options.braces_on_own_line !== void 0) {
    this.raw_options.brace_style = this.raw_options.braces_on_own_line ? "expand" : "collapse";
  }
  var brace_style_split = this._get_selection_list("brace_style", ["collapse", "expand", "end-expand", "none", "preserve-inline"]);
  this.brace_preserve_inline = false;
  this.brace_style = "collapse";
  for (var bs = 0; bs < brace_style_split.length; bs++) {
    if (brace_style_split[bs] === "preserve-inline") {
      this.brace_preserve_inline = true;
    } else {
      this.brace_style = brace_style_split[bs];
    }
  }
  this.unindent_chained_methods = this._get_boolean("unindent_chained_methods");
  this.break_chained_methods = this._get_boolean("break_chained_methods");
  this.space_in_paren = this._get_boolean("space_in_paren");
  this.space_in_empty_paren = this._get_boolean("space_in_empty_paren");
  this.jslint_happy = this._get_boolean("jslint_happy");
  this.space_after_anon_function = this._get_boolean("space_after_anon_function");
  this.space_after_named_function = this._get_boolean("space_after_named_function");
  this.keep_array_indentation = this._get_boolean("keep_array_indentation");
  this.space_before_conditional = this._get_boolean("space_before_conditional", true);
  this.unescape_strings = this._get_boolean("unescape_strings");
  this.e4x = this._get_boolean("e4x");
  this.comma_first = this._get_boolean("comma_first");
  this.operator_position = this._get_selection("operator_position", validPositionValues$1);
  this.test_output_raw = this._get_boolean("test_output_raw");
  if (this.jslint_happy) {
    this.space_after_anon_function = true;
  }
}
Options$8.prototype = new BaseOptions$2();
options$3.Options = Options$8;
var tokenizer$2 = {};
var inputscanner = {};
var regexp_has_sticky = RegExp.prototype.hasOwnProperty("sticky");
function InputScanner$3(input_string) {
  this.__input = input_string || "";
  this.__input_length = this.__input.length;
  this.__position = 0;
}
InputScanner$3.prototype.restart = function() {
  this.__position = 0;
};
InputScanner$3.prototype.back = function() {
  if (this.__position > 0) {
    this.__position -= 1;
  }
};
InputScanner$3.prototype.hasNext = function() {
  return this.__position < this.__input_length;
};
InputScanner$3.prototype.next = function() {
  var val = null;
  if (this.hasNext()) {
    val = this.__input.charAt(this.__position);
    this.__position += 1;
  }
  return val;
};
InputScanner$3.prototype.peek = function(index2) {
  var val = null;
  index2 = index2 || 0;
  index2 += this.__position;
  if (index2 >= 0 && index2 < this.__input_length) {
    val = this.__input.charAt(index2);
  }
  return val;
};
InputScanner$3.prototype.__match = function(pattern2, index2) {
  pattern2.lastIndex = index2;
  var pattern_match = pattern2.exec(this.__input);
  if (pattern_match && !(regexp_has_sticky && pattern2.sticky)) {
    if (pattern_match.index !== index2) {
      pattern_match = null;
    }
  }
  return pattern_match;
};
InputScanner$3.prototype.test = function(pattern2, index2) {
  index2 = index2 || 0;
  index2 += this.__position;
  if (index2 >= 0 && index2 < this.__input_length) {
    return !!this.__match(pattern2, index2);
  } else {
    return false;
  }
};
InputScanner$3.prototype.testChar = function(pattern2, index2) {
  var val = this.peek(index2);
  pattern2.lastIndex = 0;
  return val !== null && pattern2.test(val);
};
InputScanner$3.prototype.match = function(pattern2) {
  var pattern_match = this.__match(pattern2, this.__position);
  if (pattern_match) {
    this.__position += pattern_match[0].length;
  } else {
    pattern_match = null;
  }
  return pattern_match;
};
InputScanner$3.prototype.read = function(starting_pattern, until_pattern, until_after) {
  var val = "";
  var match;
  if (starting_pattern) {
    match = this.match(starting_pattern);
    if (match) {
      val += match[0];
    }
  }
  if (until_pattern && (match || !starting_pattern)) {
    val += this.readUntil(until_pattern, until_after);
  }
  return val;
};
InputScanner$3.prototype.readUntil = function(pattern2, until_after) {
  var val = "";
  var match_index = this.__position;
  pattern2.lastIndex = this.__position;
  var pattern_match = pattern2.exec(this.__input);
  if (pattern_match) {
    match_index = pattern_match.index;
    if (until_after) {
      match_index += pattern_match[0].length;
    }
  } else {
    match_index = this.__input_length;
  }
  val = this.__input.substring(this.__position, match_index);
  this.__position = match_index;
  return val;
};
InputScanner$3.prototype.readUntilAfter = function(pattern2) {
  return this.readUntil(pattern2, true);
};
InputScanner$3.prototype.get_regexp = function(pattern2, match_from) {
  var result = null;
  var flags = "g";
  if (match_from && regexp_has_sticky) {
    flags = "y";
  }
  if (typeof pattern2 === "string" && pattern2 !== "") {
    result = new RegExp(pattern2, flags);
  } else if (pattern2) {
    result = new RegExp(pattern2.source, flags);
  }
  return result;
};
InputScanner$3.prototype.get_literal_regexp = function(literal_string) {
  return RegExp(literal_string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
};
InputScanner$3.prototype.peekUntilAfter = function(pattern2) {
  var start = this.__position;
  var val = this.readUntilAfter(pattern2);
  this.__position = start;
  return val;
};
InputScanner$3.prototype.lookBack = function(testVal) {
  var start = this.__position - 1;
  return start >= testVal.length && this.__input.substring(start - testVal.length, start).toLowerCase() === testVal;
};
inputscanner.InputScanner = InputScanner$3;
var tokenizer$1 = {};
var tokenstream = {};
function TokenStream$1(parent_token) {
  this.__tokens = [];
  this.__tokens_length = this.__tokens.length;
  this.__position = 0;
  this.__parent_token = parent_token;
}
TokenStream$1.prototype.restart = function() {
  this.__position = 0;
};
TokenStream$1.prototype.isEmpty = function() {
  return this.__tokens_length === 0;
};
TokenStream$1.prototype.hasNext = function() {
  return this.__position < this.__tokens_length;
};
TokenStream$1.prototype.next = function() {
  var val = null;
  if (this.hasNext()) {
    val = this.__tokens[this.__position];
    this.__position += 1;
  }
  return val;
};
TokenStream$1.prototype.peek = function(index2) {
  var val = null;
  index2 = index2 || 0;
  index2 += this.__position;
  if (index2 >= 0 && index2 < this.__tokens_length) {
    val = this.__tokens[index2];
  }
  return val;
};
TokenStream$1.prototype.add = function(token2) {
  if (this.__parent_token) {
    token2.parent = this.__parent_token;
  }
  this.__tokens.push(token2);
  this.__tokens_length += 1;
};
tokenstream.TokenStream = TokenStream$1;
var whitespacepattern = {};
var pattern = {};
function Pattern$4(input_scanner, parent) {
  this._input = input_scanner;
  this._starting_pattern = null;
  this._match_pattern = null;
  this._until_pattern = null;
  this._until_after = false;
  if (parent) {
    this._starting_pattern = this._input.get_regexp(parent._starting_pattern, true);
    this._match_pattern = this._input.get_regexp(parent._match_pattern, true);
    this._until_pattern = this._input.get_regexp(parent._until_pattern);
    this._until_after = parent._until_after;
  }
}
Pattern$4.prototype.read = function() {
  var result = this._input.read(this._starting_pattern);
  if (!this._starting_pattern || result) {
    result += this._input.read(this._match_pattern, this._until_pattern, this._until_after);
  }
  return result;
};
Pattern$4.prototype.read_match = function() {
  return this._input.match(this._match_pattern);
};
Pattern$4.prototype.until_after = function(pattern2) {
  var result = this._create();
  result._until_after = true;
  result._until_pattern = this._input.get_regexp(pattern2);
  result._update();
  return result;
};
Pattern$4.prototype.until = function(pattern2) {
  var result = this._create();
  result._until_after = false;
  result._until_pattern = this._input.get_regexp(pattern2);
  result._update();
  return result;
};
Pattern$4.prototype.starting_with = function(pattern2) {
  var result = this._create();
  result._starting_pattern = this._input.get_regexp(pattern2, true);
  result._update();
  return result;
};
Pattern$4.prototype.matching = function(pattern2) {
  var result = this._create();
  result._match_pattern = this._input.get_regexp(pattern2, true);
  result._update();
  return result;
};
Pattern$4.prototype._create = function() {
  return new Pattern$4(this._input, this);
};
Pattern$4.prototype._update = function() {
};
pattern.Pattern = Pattern$4;
var Pattern$3 = pattern.Pattern;
function WhitespacePattern$1(input_scanner, parent) {
  Pattern$3.call(this, input_scanner, parent);
  if (parent) {
    this._line_regexp = this._input.get_regexp(parent._line_regexp);
  } else {
    this.__set_whitespace_patterns("", "");
  }
  this.newline_count = 0;
  this.whitespace_before_token = "";
}
WhitespacePattern$1.prototype = new Pattern$3();
WhitespacePattern$1.prototype.__set_whitespace_patterns = function(whitespace_chars, newline_chars) {
  whitespace_chars += "\\t ";
  newline_chars += "\\n\\r";
  this._match_pattern = this._input.get_regexp(
    "[" + whitespace_chars + newline_chars + "]+",
    true
  );
  this._newline_regexp = this._input.get_regexp(
    "\\r\\n|[" + newline_chars + "]"
  );
};
WhitespacePattern$1.prototype.read = function() {
  this.newline_count = 0;
  this.whitespace_before_token = "";
  var resulting_string = this._input.read(this._match_pattern);
  if (resulting_string === " ") {
    this.whitespace_before_token = " ";
  } else if (resulting_string) {
    var matches = this.__split(this._newline_regexp, resulting_string);
    this.newline_count = matches.length - 1;
    this.whitespace_before_token = matches[this.newline_count];
  }
  return resulting_string;
};
WhitespacePattern$1.prototype.matching = function(whitespace_chars, newline_chars) {
  var result = this._create();
  result.__set_whitespace_patterns(whitespace_chars, newline_chars);
  result._update();
  return result;
};
WhitespacePattern$1.prototype._create = function() {
  return new WhitespacePattern$1(this._input, this);
};
WhitespacePattern$1.prototype.__split = function(regexp, input_string) {
  regexp.lastIndex = 0;
  var start_index = 0;
  var result = [];
  var next_match = regexp.exec(input_string);
  while (next_match) {
    result.push(input_string.substring(start_index, next_match.index));
    start_index = next_match.index + next_match[0].length;
    next_match = regexp.exec(input_string);
  }
  if (start_index < input_string.length) {
    result.push(input_string.substring(start_index, input_string.length));
  } else {
    result.push("");
  }
  return result;
};
whitespacepattern.WhitespacePattern = WhitespacePattern$1;
var InputScanner$2 = inputscanner.InputScanner;
var Token$1 = token.Token;
var TokenStream = tokenstream.TokenStream;
var WhitespacePattern = whitespacepattern.WhitespacePattern;
var TOKEN$4 = {
  START: "TK_START",
  RAW: "TK_RAW",
  EOF: "TK_EOF"
};
var Tokenizer$4 = function(input_string, options2) {
  this._input = new InputScanner$2(input_string);
  this._options = options2 || {};
  this.__tokens = null;
  this._patterns = {};
  this._patterns.whitespace = new WhitespacePattern(this._input);
};
Tokenizer$4.prototype.tokenize = function() {
  this._input.restart();
  this.__tokens = new TokenStream();
  this._reset();
  var current;
  var previous = new Token$1(TOKEN$4.START, "");
  var open_token = null;
  var open_stack = [];
  var comments = new TokenStream();
  while (previous.type !== TOKEN$4.EOF) {
    current = this._get_next_token(previous, open_token);
    while (this._is_comment(current)) {
      comments.add(current);
      current = this._get_next_token(previous, open_token);
    }
    if (!comments.isEmpty()) {
      current.comments_before = comments;
      comments = new TokenStream();
    }
    current.parent = open_token;
    if (this._is_opening(current)) {
      open_stack.push(open_token);
      open_token = current;
    } else if (open_token && this._is_closing(current, open_token)) {
      current.opened = open_token;
      open_token.closed = current;
      open_token = open_stack.pop();
      current.parent = open_token;
    }
    current.previous = previous;
    previous.next = current;
    this.__tokens.add(current);
    previous = current;
  }
  return this.__tokens;
};
Tokenizer$4.prototype._is_first_token = function() {
  return this.__tokens.isEmpty();
};
Tokenizer$4.prototype._reset = function() {
};
Tokenizer$4.prototype._get_next_token = function(previous_token, open_token) {
  this._readWhitespace();
  var resulting_string = this._input.read(/.+/g);
  if (resulting_string) {
    return this._create_token(TOKEN$4.RAW, resulting_string);
  } else {
    return this._create_token(TOKEN$4.EOF, "");
  }
};
Tokenizer$4.prototype._is_comment = function(current_token) {
  return false;
};
Tokenizer$4.prototype._is_opening = function(current_token) {
  return false;
};
Tokenizer$4.prototype._is_closing = function(current_token, open_token) {
  return false;
};
Tokenizer$4.prototype._create_token = function(type, text) {
  var token2 = new Token$1(
    type,
    text,
    this._patterns.whitespace.newline_count,
    this._patterns.whitespace.whitespace_before_token
  );
  return token2;
};
Tokenizer$4.prototype._readWhitespace = function() {
  return this._patterns.whitespace.read();
};
tokenizer$1.Tokenizer = Tokenizer$4;
tokenizer$1.TOKEN = TOKEN$4;
var directives = {};
function Directives$3(start_block_pattern, end_block_pattern) {
  start_block_pattern = typeof start_block_pattern === "string" ? start_block_pattern : start_block_pattern.source;
  end_block_pattern = typeof end_block_pattern === "string" ? end_block_pattern : end_block_pattern.source;
  this.__directives_block_pattern = new RegExp(start_block_pattern + / beautify( \w+[:]\w+)+ /.source + end_block_pattern, "g");
  this.__directive_pattern = / (\w+)[:](\w+)/g;
  this.__directives_end_ignore_pattern = new RegExp(start_block_pattern + /\sbeautify\signore:end\s/.source + end_block_pattern, "g");
}
Directives$3.prototype.get_directives = function(text) {
  if (!text.match(this.__directives_block_pattern)) {
    return null;
  }
  var directives2 = {};
  this.__directive_pattern.lastIndex = 0;
  var directive_match = this.__directive_pattern.exec(text);
  while (directive_match) {
    directives2[directive_match[1]] = directive_match[2];
    directive_match = this.__directive_pattern.exec(text);
  }
  return directives2;
};
Directives$3.prototype.readIgnored = function(input) {
  return input.readUntilAfter(this.__directives_end_ignore_pattern);
};
directives.Directives = Directives$3;
var templatablepattern = {};
var Pattern$2 = pattern.Pattern;
var template_names = {
  django: false,
  erb: false,
  handlebars: false,
  php: false,
  smarty: false,
  angular: false
};
function TemplatablePattern$2(input_scanner, parent) {
  Pattern$2.call(this, input_scanner, parent);
  this.__template_pattern = null;
  this._disabled = Object.assign({}, template_names);
  this._excluded = Object.assign({}, template_names);
  if (parent) {
    this.__template_pattern = this._input.get_regexp(parent.__template_pattern);
    this._excluded = Object.assign(this._excluded, parent._excluded);
    this._disabled = Object.assign(this._disabled, parent._disabled);
  }
  var pattern2 = new Pattern$2(input_scanner);
  this.__patterns = {
    handlebars_comment: pattern2.starting_with(/{{!--/).until_after(/--}}/),
    handlebars_unescaped: pattern2.starting_with(/{{{/).until_after(/}}}/),
    handlebars: pattern2.starting_with(/{{/).until_after(/}}/),
    php: pattern2.starting_with(/<\?(?:[= ]|php)/).until_after(/\?>/),
    erb: pattern2.starting_with(/<%[^%]/).until_after(/[^%]%>/),
    django: pattern2.starting_with(/{%/).until_after(/%}/),
    django_value: pattern2.starting_with(/{{/).until_after(/}}/),
    django_comment: pattern2.starting_with(/{#/).until_after(/#}/),
    smarty: pattern2.starting_with(/{(?=[^}{\s\n])/).until_after(/[^\s\n]}/),
    smarty_comment: pattern2.starting_with(/{\*/).until_after(/\*}/),
    smarty_literal: pattern2.starting_with(/{literal}/).until_after(/{\/literal}/)
  };
}
TemplatablePattern$2.prototype = new Pattern$2();
TemplatablePattern$2.prototype._create = function() {
  return new TemplatablePattern$2(this._input, this);
};
TemplatablePattern$2.prototype._update = function() {
  this.__set_templated_pattern();
};
TemplatablePattern$2.prototype.disable = function(language) {
  var result = this._create();
  result._disabled[language] = true;
  result._update();
  return result;
};
TemplatablePattern$2.prototype.read_options = function(options2) {
  var result = this._create();
  for (var language in template_names) {
    result._disabled[language] = options2.templating.indexOf(language) === -1;
  }
  result._update();
  return result;
};
TemplatablePattern$2.prototype.exclude = function(language) {
  var result = this._create();
  result._excluded[language] = true;
  result._update();
  return result;
};
TemplatablePattern$2.prototype.read = function() {
  var result = "";
  if (this._match_pattern) {
    result = this._input.read(this._starting_pattern);
  } else {
    result = this._input.read(this._starting_pattern, this.__template_pattern);
  }
  var next = this._read_template();
  while (next) {
    if (this._match_pattern) {
      next += this._input.read(this._match_pattern);
    } else {
      next += this._input.readUntil(this.__template_pattern);
    }
    result += next;
    next = this._read_template();
  }
  if (this._until_after) {
    result += this._input.readUntilAfter(this._until_pattern);
  }
  return result;
};
TemplatablePattern$2.prototype.__set_templated_pattern = function() {
  var items = [];
  if (!this._disabled.php) {
    items.push(this.__patterns.php._starting_pattern.source);
  }
  if (!this._disabled.handlebars) {
    items.push(this.__patterns.handlebars._starting_pattern.source);
  }
  if (!this._disabled.angular) {
    items.push(this.__patterns.handlebars._starting_pattern.source);
  }
  if (!this._disabled.erb) {
    items.push(this.__patterns.erb._starting_pattern.source);
  }
  if (!this._disabled.django) {
    items.push(this.__patterns.django._starting_pattern.source);
    items.push(this.__patterns.django_value._starting_pattern.source);
    items.push(this.__patterns.django_comment._starting_pattern.source);
  }
  if (!this._disabled.smarty) {
    items.push(this.__patterns.smarty._starting_pattern.source);
  }
  if (this._until_pattern) {
    items.push(this._until_pattern.source);
  }
  this.__template_pattern = this._input.get_regexp("(?:" + items.join("|") + ")");
};
TemplatablePattern$2.prototype._read_template = function() {
  var resulting_string = "";
  var c = this._input.peek();
  if (c === "<") {
    var peek1 = this._input.peek(1);
    if (!this._disabled.php && !this._excluded.php && peek1 === "?") {
      resulting_string = resulting_string || this.__patterns.php.read();
    }
    if (!this._disabled.erb && !this._excluded.erb && peek1 === "%") {
      resulting_string = resulting_string || this.__patterns.erb.read();
    }
  } else if (c === "{") {
    if (!this._disabled.handlebars && !this._excluded.handlebars) {
      resulting_string = resulting_string || this.__patterns.handlebars_comment.read();
      resulting_string = resulting_string || this.__patterns.handlebars_unescaped.read();
      resulting_string = resulting_string || this.__patterns.handlebars.read();
    }
    if (!this._disabled.django) {
      if (!this._excluded.django && !this._excluded.handlebars) {
        resulting_string = resulting_string || this.__patterns.django_value.read();
      }
      if (!this._excluded.django) {
        resulting_string = resulting_string || this.__patterns.django_comment.read();
        resulting_string = resulting_string || this.__patterns.django.read();
      }
    }
    if (!this._disabled.smarty) {
      if (this._disabled.django && this._disabled.handlebars) {
        resulting_string = resulting_string || this.__patterns.smarty_comment.read();
        resulting_string = resulting_string || this.__patterns.smarty_literal.read();
        resulting_string = resulting_string || this.__patterns.smarty.read();
      }
    }
  }
  return resulting_string;
};
templatablepattern.TemplatablePattern = TemplatablePattern$2;
var InputScanner$1 = inputscanner.InputScanner;
var BaseTokenizer$1 = tokenizer$1.Tokenizer;
var BASETOKEN$1 = tokenizer$1.TOKEN;
var Directives$2 = directives.Directives;
var acorn$1 = acorn$2;
var Pattern$1 = pattern.Pattern;
var TemplatablePattern$1 = templatablepattern.TemplatablePattern;
function in_array$2(what, arr) {
  return arr.indexOf(what) !== -1;
}
var TOKEN$3 = {
  START_EXPR: "TK_START_EXPR",
  END_EXPR: "TK_END_EXPR",
  START_BLOCK: "TK_START_BLOCK",
  END_BLOCK: "TK_END_BLOCK",
  WORD: "TK_WORD",
  RESERVED: "TK_RESERVED",
  SEMICOLON: "TK_SEMICOLON",
  STRING: "TK_STRING",
  EQUALS: "TK_EQUALS",
  OPERATOR: "TK_OPERATOR",
  COMMA: "TK_COMMA",
  BLOCK_COMMENT: "TK_BLOCK_COMMENT",
  COMMENT: "TK_COMMENT",
  DOT: "TK_DOT",
  UNKNOWN: "TK_UNKNOWN",
  START: BASETOKEN$1.START,
  RAW: BASETOKEN$1.RAW,
  EOF: BASETOKEN$1.EOF
};
var directives_core$2 = new Directives$2(/\/\*/, /\*\//);
var number_pattern = /0[xX][0123456789abcdefABCDEF_]*n?|0[oO][01234567_]*n?|0[bB][01_]*n?|\d[\d_]*n|(?:\.\d[\d_]*|\d[\d_]*\.?[\d_]*)(?:[eE][+-]?[\d_]+)?/;
var digit = /[0-9]/;
var dot_pattern = /[^\d\.]/;
var positionable_operators$1 = ">>> === !== &&= ??= ||= << && >= ** != == <= >> || ?? |> < / - + > : & % ? ^ | *".split(" ");
var punct = ">>>= ... >>= <<= === >>> !== **= &&= ??= ||= => ^= :: /= << <= == && -= >= >> != -- += ** || ?? ++ %= &= *= |= |> = ! ? > < : / ^ - + * & % ~ |";
punct = punct.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&");
punct = "\\?\\.(?!\\d) " + punct;
punct = punct.replace(/ /g, "|");
var punct_pattern = new RegExp(punct);
var line_starters$1 = "continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export".split(",");
var reserved_words = line_starters$1.concat(["do", "in", "of", "else", "get", "set", "new", "catch", "finally", "typeof", "yield", "async", "await", "from", "as", "class", "extends"]);
var reserved_word_pattern = new RegExp("^(?:" + reserved_words.join("|") + ")$");
var in_html_comment;
var Tokenizer$3 = function(input_string, options2) {
  BaseTokenizer$1.call(this, input_string, options2);
  this._patterns.whitespace = this._patterns.whitespace.matching(
    /\u00A0\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff/.source,
    /\u2028\u2029/.source
  );
  var pattern_reader = new Pattern$1(this._input);
  var templatable = new TemplatablePattern$1(this._input).read_options(this._options);
  this.__patterns = {
    template: templatable,
    identifier: templatable.starting_with(acorn$1.identifier).matching(acorn$1.identifierMatch),
    number: pattern_reader.matching(number_pattern),
    punct: pattern_reader.matching(punct_pattern),
    comment: pattern_reader.starting_with(/\/\//).until(/[\n\r\u2028\u2029]/),
    block_comment: pattern_reader.starting_with(/\/\*/).until_after(/\*\//),
    html_comment_start: pattern_reader.matching(/<!--/),
    html_comment_end: pattern_reader.matching(/-->/),
    include: pattern_reader.starting_with(/#include/).until_after(acorn$1.lineBreak),
    shebang: pattern_reader.starting_with(/#!/).until_after(acorn$1.lineBreak),
    xml: pattern_reader.matching(/[\s\S]*?<(\/?)([-a-zA-Z:0-9_.]+|{[^}]+?}|!\[CDATA\[[^\]]*?\]\]|)(\s*{[^}]+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{([^{}]|{[^}]+?})+?}))*\s*(\/?)\s*>/),
    single_quote: templatable.until(/['\\\n\r\u2028\u2029]/),
    double_quote: templatable.until(/["\\\n\r\u2028\u2029]/),
    template_text: templatable.until(/[`\\$]/),
    template_expression: templatable.until(/[`}\\]/)
  };
};
Tokenizer$3.prototype = new BaseTokenizer$1();
Tokenizer$3.prototype._is_comment = function(current_token) {
  return current_token.type === TOKEN$3.COMMENT || current_token.type === TOKEN$3.BLOCK_COMMENT || current_token.type === TOKEN$3.UNKNOWN;
};
Tokenizer$3.prototype._is_opening = function(current_token) {
  return current_token.type === TOKEN$3.START_BLOCK || current_token.type === TOKEN$3.START_EXPR;
};
Tokenizer$3.prototype._is_closing = function(current_token, open_token) {
  return (current_token.type === TOKEN$3.END_BLOCK || current_token.type === TOKEN$3.END_EXPR) && (open_token && (current_token.text === "]" && open_token.text === "[" || current_token.text === ")" && open_token.text === "(" || current_token.text === "}" && open_token.text === "{"));
};
Tokenizer$3.prototype._reset = function() {
  in_html_comment = false;
};
Tokenizer$3.prototype._get_next_token = function(previous_token, open_token) {
  var token2 = null;
  this._readWhitespace();
  var c = this._input.peek();
  if (c === null) {
    return this._create_token(TOKEN$3.EOF, "");
  }
  token2 = token2 || this._read_non_javascript(c);
  token2 = token2 || this._read_string(c);
  token2 = token2 || this._read_pair(c, this._input.peek(1));
  token2 = token2 || this._read_word(previous_token);
  token2 = token2 || this._read_singles(c);
  token2 = token2 || this._read_comment(c);
  token2 = token2 || this._read_regexp(c, previous_token);
  token2 = token2 || this._read_xml(c, previous_token);
  token2 = token2 || this._read_punctuation();
  token2 = token2 || this._create_token(TOKEN$3.UNKNOWN, this._input.next());
  return token2;
};
Tokenizer$3.prototype._read_word = function(previous_token) {
  var resulting_string;
  resulting_string = this.__patterns.identifier.read();
  if (resulting_string !== "") {
    resulting_string = resulting_string.replace(acorn$1.allLineBreaks, "\n");
    if (!(previous_token.type === TOKEN$3.DOT || previous_token.type === TOKEN$3.RESERVED && (previous_token.text === "set" || previous_token.text === "get")) && reserved_word_pattern.test(resulting_string)) {
      if ((resulting_string === "in" || resulting_string === "of") && (previous_token.type === TOKEN$3.WORD || previous_token.type === TOKEN$3.STRING)) {
        return this._create_token(TOKEN$3.OPERATOR, resulting_string);
      }
      return this._create_token(TOKEN$3.RESERVED, resulting_string);
    }
    return this._create_token(TOKEN$3.WORD, resulting_string);
  }
  resulting_string = this.__patterns.number.read();
  if (resulting_string !== "") {
    return this._create_token(TOKEN$3.WORD, resulting_string);
  }
};
Tokenizer$3.prototype._read_singles = function(c) {
  var token2 = null;
  if (c === "(" || c === "[") {
    token2 = this._create_token(TOKEN$3.START_EXPR, c);
  } else if (c === ")" || c === "]") {
    token2 = this._create_token(TOKEN$3.END_EXPR, c);
  } else if (c === "{") {
    token2 = this._create_token(TOKEN$3.START_BLOCK, c);
  } else if (c === "}") {
    token2 = this._create_token(TOKEN$3.END_BLOCK, c);
  } else if (c === ";") {
    token2 = this._create_token(TOKEN$3.SEMICOLON, c);
  } else if (c === "." && dot_pattern.test(this._input.peek(1))) {
    token2 = this._create_token(TOKEN$3.DOT, c);
  } else if (c === ",") {
    token2 = this._create_token(TOKEN$3.COMMA, c);
  }
  if (token2) {
    this._input.next();
  }
  return token2;
};
Tokenizer$3.prototype._read_pair = function(c, d) {
  var token2 = null;
  if (c === "#" && d === "{") {
    token2 = this._create_token(TOKEN$3.START_BLOCK, c + d);
  }
  if (token2) {
    this._input.next();
    this._input.next();
  }
  return token2;
};
Tokenizer$3.prototype._read_punctuation = function() {
  var resulting_string = this.__patterns.punct.read();
  if (resulting_string !== "") {
    if (resulting_string === "=") {
      return this._create_token(TOKEN$3.EQUALS, resulting_string);
    } else if (resulting_string === "?.") {
      return this._create_token(TOKEN$3.DOT, resulting_string);
    } else {
      return this._create_token(TOKEN$3.OPERATOR, resulting_string);
    }
  }
};
Tokenizer$3.prototype._read_non_javascript = function(c) {
  var resulting_string = "";
  if (c === "#") {
    if (this._is_first_token()) {
      resulting_string = this.__patterns.shebang.read();
      if (resulting_string) {
        return this._create_token(TOKEN$3.UNKNOWN, resulting_string.trim() + "\n");
      }
    }
    resulting_string = this.__patterns.include.read();
    if (resulting_string) {
      return this._create_token(TOKEN$3.UNKNOWN, resulting_string.trim() + "\n");
    }
    c = this._input.next();
    var sharp = "#";
    if (this._input.hasNext() && this._input.testChar(digit)) {
      do {
        c = this._input.next();
        sharp += c;
      } while (this._input.hasNext() && c !== "#" && c !== "=");
      if (c === "#")
        ;
      else if (this._input.peek() === "[" && this._input.peek(1) === "]") {
        sharp += "[]";
        this._input.next();
        this._input.next();
      } else if (this._input.peek() === "{" && this._input.peek(1) === "}") {
        sharp += "{}";
        this._input.next();
        this._input.next();
      }
      return this._create_token(TOKEN$3.WORD, sharp);
    }
    this._input.back();
  } else if (c === "<" && this._is_first_token()) {
    resulting_string = this.__patterns.html_comment_start.read();
    if (resulting_string) {
      while (this._input.hasNext() && !this._input.testChar(acorn$1.newline)) {
        resulting_string += this._input.next();
      }
      in_html_comment = true;
      return this._create_token(TOKEN$3.COMMENT, resulting_string);
    }
  } else if (in_html_comment && c === "-") {
    resulting_string = this.__patterns.html_comment_end.read();
    if (resulting_string) {
      in_html_comment = false;
      return this._create_token(TOKEN$3.COMMENT, resulting_string);
    }
  }
  return null;
};
Tokenizer$3.prototype._read_comment = function(c) {
  var token2 = null;
  if (c === "/") {
    var comment = "";
    if (this._input.peek(1) === "*") {
      comment = this.__patterns.block_comment.read();
      var directives2 = directives_core$2.get_directives(comment);
      if (directives2 && directives2.ignore === "start") {
        comment += directives_core$2.readIgnored(this._input);
      }
      comment = comment.replace(acorn$1.allLineBreaks, "\n");
      token2 = this._create_token(TOKEN$3.BLOCK_COMMENT, comment);
      token2.directives = directives2;
    } else if (this._input.peek(1) === "/") {
      comment = this.__patterns.comment.read();
      token2 = this._create_token(TOKEN$3.COMMENT, comment);
    }
  }
  return token2;
};
Tokenizer$3.prototype._read_string = function(c) {
  if (c === "`" || c === "'" || c === '"') {
    var resulting_string = this._input.next();
    this.has_char_escapes = false;
    if (c === "`") {
      resulting_string += this._read_string_recursive("`", true, "${");
    } else {
      resulting_string += this._read_string_recursive(c);
    }
    if (this.has_char_escapes && this._options.unescape_strings) {
      resulting_string = unescape_string(resulting_string);
    }
    if (this._input.peek() === c) {
      resulting_string += this._input.next();
    }
    resulting_string = resulting_string.replace(acorn$1.allLineBreaks, "\n");
    return this._create_token(TOKEN$3.STRING, resulting_string);
  }
  return null;
};
Tokenizer$3.prototype._allow_regexp_or_xml = function(previous_token) {
  return previous_token.type === TOKEN$3.RESERVED && in_array$2(previous_token.text, ["return", "case", "throw", "else", "do", "typeof", "yield"]) || previous_token.type === TOKEN$3.END_EXPR && previous_token.text === ")" && previous_token.opened.previous.type === TOKEN$3.RESERVED && in_array$2(previous_token.opened.previous.text, ["if", "while", "for"]) || in_array$2(previous_token.type, [
    TOKEN$3.COMMENT,
    TOKEN$3.START_EXPR,
    TOKEN$3.START_BLOCK,
    TOKEN$3.START,
    TOKEN$3.END_BLOCK,
    TOKEN$3.OPERATOR,
    TOKEN$3.EQUALS,
    TOKEN$3.EOF,
    TOKEN$3.SEMICOLON,
    TOKEN$3.COMMA
  ]);
};
Tokenizer$3.prototype._read_regexp = function(c, previous_token) {
  if (c === "/" && this._allow_regexp_or_xml(previous_token)) {
    var resulting_string = this._input.next();
    var esc = false;
    var in_char_class = false;
    while (this._input.hasNext() && ((esc || in_char_class || this._input.peek() !== c) && !this._input.testChar(acorn$1.newline))) {
      resulting_string += this._input.peek();
      if (!esc) {
        esc = this._input.peek() === "\\";
        if (this._input.peek() === "[") {
          in_char_class = true;
        } else if (this._input.peek() === "]") {
          in_char_class = false;
        }
      } else {
        esc = false;
      }
      this._input.next();
    }
    if (this._input.peek() === c) {
      resulting_string += this._input.next();
      resulting_string += this._input.read(acorn$1.identifier);
    }
    return this._create_token(TOKEN$3.STRING, resulting_string);
  }
  return null;
};
Tokenizer$3.prototype._read_xml = function(c, previous_token) {
  if (this._options.e4x && c === "<" && this._allow_regexp_or_xml(previous_token)) {
    var xmlStr = "";
    var match = this.__patterns.xml.read_match();
    if (match) {
      var rootTag = match[2].replace(/^{\s+/, "{").replace(/\s+}$/, "}");
      var isCurlyRoot = rootTag.indexOf("{") === 0;
      var depth = 0;
      while (match) {
        var isEndTag = !!match[1];
        var tagName = match[2];
        var isSingletonTag = !!match[match.length - 1] || tagName.slice(0, 8) === "![CDATA[";
        if (!isSingletonTag && (tagName === rootTag || isCurlyRoot && tagName.replace(/^{\s+/, "{").replace(/\s+}$/, "}"))) {
          if (isEndTag) {
            --depth;
          } else {
            ++depth;
          }
        }
        xmlStr += match[0];
        if (depth <= 0) {
          break;
        }
        match = this.__patterns.xml.read_match();
      }
      if (!match) {
        xmlStr += this._input.match(/[\s\S]*/g)[0];
      }
      xmlStr = xmlStr.replace(acorn$1.allLineBreaks, "\n");
      return this._create_token(TOKEN$3.STRING, xmlStr);
    }
  }
  return null;
};
function unescape_string(s) {
  var out = "", escaped = 0;
  var input_scan = new InputScanner$1(s);
  var matched = null;
  while (input_scan.hasNext()) {
    matched = input_scan.match(/([\s]|[^\\]|\\\\)+/g);
    if (matched) {
      out += matched[0];
    }
    if (input_scan.peek() === "\\") {
      input_scan.next();
      if (input_scan.peek() === "x") {
        matched = input_scan.match(/x([0-9A-Fa-f]{2})/g);
      } else if (input_scan.peek() === "u") {
        matched = input_scan.match(/u([0-9A-Fa-f]{4})/g);
        if (!matched) {
          matched = input_scan.match(/u\{([0-9A-Fa-f]+)\}/g);
        }
      } else {
        out += "\\";
        if (input_scan.hasNext()) {
          out += input_scan.next();
        }
        continue;
      }
      if (!matched) {
        return s;
      }
      escaped = parseInt(matched[1], 16);
      if (escaped > 126 && escaped <= 255 && matched[0].indexOf("x") === 0) {
        return s;
      } else if (escaped >= 0 && escaped < 32) {
        out += "\\" + matched[0];
      } else if (escaped > 1114111) {
        out += "\\" + matched[0];
      } else if (escaped === 34 || escaped === 39 || escaped === 92) {
        out += "\\" + String.fromCharCode(escaped);
      } else {
        out += String.fromCharCode(escaped);
      }
    }
  }
  return out;
}
Tokenizer$3.prototype._read_string_recursive = function(delimiter, allow_unescaped_newlines, start_sub) {
  var current_char;
  var pattern2;
  if (delimiter === "'") {
    pattern2 = this.__patterns.single_quote;
  } else if (delimiter === '"') {
    pattern2 = this.__patterns.double_quote;
  } else if (delimiter === "`") {
    pattern2 = this.__patterns.template_text;
  } else if (delimiter === "}") {
    pattern2 = this.__patterns.template_expression;
  }
  var resulting_string = pattern2.read();
  var next = "";
  while (this._input.hasNext()) {
    next = this._input.next();
    if (next === delimiter || !allow_unescaped_newlines && acorn$1.newline.test(next)) {
      this._input.back();
      break;
    } else if (next === "\\" && this._input.hasNext()) {
      current_char = this._input.peek();
      if (current_char === "x" || current_char === "u") {
        this.has_char_escapes = true;
      } else if (current_char === "\r" && this._input.peek(1) === "\n") {
        this._input.next();
      }
      next += this._input.next();
    } else if (start_sub) {
      if (start_sub === "${" && next === "$" && this._input.peek() === "{") {
        next += this._input.next();
      }
      if (start_sub === next) {
        if (delimiter === "`") {
          next += this._read_string_recursive("}", allow_unescaped_newlines, "`");
        } else {
          next += this._read_string_recursive("`", allow_unescaped_newlines, "${");
        }
        if (this._input.hasNext()) {
          next += this._input.next();
        }
      }
    }
    next += pattern2.read();
    resulting_string += next;
  }
  return resulting_string;
};
tokenizer$2.Tokenizer = Tokenizer$3;
tokenizer$2.TOKEN = TOKEN$3;
tokenizer$2.positionable_operators = positionable_operators$1.slice();
tokenizer$2.line_starters = line_starters$1.slice();
var Output$2 = output.Output;
var Token = token.Token;
var acorn = acorn$2;
var Options$7 = options$3.Options;
var Tokenizer$2 = tokenizer$2.Tokenizer;
var line_starters = tokenizer$2.line_starters;
var positionable_operators = tokenizer$2.positionable_operators;
var TOKEN$2 = tokenizer$2.TOKEN;
function in_array$1(what, arr) {
  return arr.indexOf(what) !== -1;
}
function ltrim(s) {
  return s.replace(/^\s+/g, "");
}
function generateMapFromStrings(list) {
  var result = {};
  for (var x = 0; x < list.length; x++) {
    result[list[x].replace(/-/g, "_")] = list[x];
  }
  return result;
}
function reserved_word(token2, word) {
  return token2 && token2.type === TOKEN$2.RESERVED && token2.text === word;
}
function reserved_array(token2, words) {
  return token2 && token2.type === TOKEN$2.RESERVED && in_array$1(token2.text, words);
}
var special_words = ["case", "return", "do", "if", "throw", "else", "await", "break", "continue", "async"];
var validPositionValues = ["before-newline", "after-newline", "preserve-newline"];
var OPERATOR_POSITION = generateMapFromStrings(validPositionValues);
var OPERATOR_POSITION_BEFORE_OR_PRESERVE = [OPERATOR_POSITION.before_newline, OPERATOR_POSITION.preserve_newline];
var MODE = {
  BlockStatement: "BlockStatement",
  Statement: "Statement",
  ObjectLiteral: "ObjectLiteral",
  ArrayLiteral: "ArrayLiteral",
  ForInitializer: "ForInitializer",
  Conditional: "Conditional",
  Expression: "Expression"
};
function remove_redundant_indentation(output2, frame) {
  if (frame.multiline_frame || frame.mode === MODE.ForInitializer || frame.mode === MODE.Conditional) {
    return;
  }
  output2.remove_indent(frame.start_line_index);
}
function split_linebreaks(s) {
  s = s.replace(acorn.allLineBreaks, "\n");
  var out = [], idx = s.indexOf("\n");
  while (idx !== -1) {
    out.push(s.substring(0, idx));
    s = s.substring(idx + 1);
    idx = s.indexOf("\n");
  }
  if (s.length) {
    out.push(s);
  }
  return out;
}
function is_array(mode) {
  return mode === MODE.ArrayLiteral;
}
function is_expression(mode) {
  return in_array$1(mode, [MODE.Expression, MODE.ForInitializer, MODE.Conditional]);
}
function all_lines_start_with(lines, c) {
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    if (line.charAt(0) !== c) {
      return false;
    }
  }
  return true;
}
function each_line_matches_indent(lines, indent) {
  var i = 0, len = lines.length, line;
  for (; i < len; i++) {
    line = lines[i];
    if (line && line.indexOf(indent) !== 0) {
      return false;
    }
  }
  return true;
}
function Beautifier$5(source_text, options2) {
  options2 = options2 || {};
  this._source_text = source_text || "";
  this._output = null;
  this._tokens = null;
  this._last_last_text = null;
  this._flags = null;
  this._previous_flags = null;
  this._flag_store = null;
  this._options = new Options$7(options2);
}
Beautifier$5.prototype.create_flags = function(flags_base, mode) {
  var next_indent_level = 0;
  if (flags_base) {
    next_indent_level = flags_base.indentation_level;
    if (!this._output.just_added_newline() && flags_base.line_indent_level > next_indent_level) {
      next_indent_level = flags_base.line_indent_level;
    }
  }
  var next_flags = {
    mode,
    parent: flags_base,
    last_token: flags_base ? flags_base.last_token : new Token(TOKEN$2.START_BLOCK, ""),
    last_word: flags_base ? flags_base.last_word : "",
    declaration_statement: false,
    declaration_assignment: false,
    multiline_frame: false,
    inline_frame: false,
    if_block: false,
    else_block: false,
    class_start_block: false,
    do_block: false,
    do_while: false,
    import_block: false,
    in_case_statement: false,
    in_case: false,
    case_body: false,
    case_block: false,
    indentation_level: next_indent_level,
    alignment: 0,
    line_indent_level: flags_base ? flags_base.line_indent_level : next_indent_level,
    start_line_index: this._output.get_line_number(),
    ternary_depth: 0
  };
  return next_flags;
};
Beautifier$5.prototype._reset = function(source_text) {
  var baseIndentString = source_text.match(/^[\t ]*/)[0];
  this._last_last_text = "";
  this._output = new Output$2(this._options, baseIndentString);
  this._output.raw = this._options.test_output_raw;
  this._flag_store = [];
  this.set_mode(MODE.BlockStatement);
  var tokenizer2 = new Tokenizer$2(source_text, this._options);
  this._tokens = tokenizer2.tokenize();
  return source_text;
};
Beautifier$5.prototype.beautify = function() {
  if (this._options.disabled) {
    return this._source_text;
  }
  var sweet_code;
  var source_text = this._reset(this._source_text);
  var eol = this._options.eol;
  if (this._options.eol === "auto") {
    eol = "\n";
    if (source_text && acorn.lineBreak.test(source_text || "")) {
      eol = source_text.match(acorn.lineBreak)[0];
    }
  }
  var current_token = this._tokens.next();
  while (current_token) {
    this.handle_token(current_token);
    this._last_last_text = this._flags.last_token.text;
    this._flags.last_token = current_token;
    current_token = this._tokens.next();
  }
  sweet_code = this._output.get_code(eol);
  return sweet_code;
};
Beautifier$5.prototype.handle_token = function(current_token, preserve_statement_flags) {
  if (current_token.type === TOKEN$2.START_EXPR) {
    this.handle_start_expr(current_token);
  } else if (current_token.type === TOKEN$2.END_EXPR) {
    this.handle_end_expr(current_token);
  } else if (current_token.type === TOKEN$2.START_BLOCK) {
    this.handle_start_block(current_token);
  } else if (current_token.type === TOKEN$2.END_BLOCK) {
    this.handle_end_block(current_token);
  } else if (current_token.type === TOKEN$2.WORD) {
    this.handle_word(current_token);
  } else if (current_token.type === TOKEN$2.RESERVED) {
    this.handle_word(current_token);
  } else if (current_token.type === TOKEN$2.SEMICOLON) {
    this.handle_semicolon(current_token);
  } else if (current_token.type === TOKEN$2.STRING) {
    this.handle_string(current_token);
  } else if (current_token.type === TOKEN$2.EQUALS) {
    this.handle_equals(current_token);
  } else if (current_token.type === TOKEN$2.OPERATOR) {
    this.handle_operator(current_token);
  } else if (current_token.type === TOKEN$2.COMMA) {
    this.handle_comma(current_token);
  } else if (current_token.type === TOKEN$2.BLOCK_COMMENT) {
    this.handle_block_comment(current_token, preserve_statement_flags);
  } else if (current_token.type === TOKEN$2.COMMENT) {
    this.handle_comment(current_token, preserve_statement_flags);
  } else if (current_token.type === TOKEN$2.DOT) {
    this.handle_dot(current_token);
  } else if (current_token.type === TOKEN$2.EOF) {
    this.handle_eof(current_token);
  } else if (current_token.type === TOKEN$2.UNKNOWN) {
    this.handle_unknown(current_token, preserve_statement_flags);
  } else {
    this.handle_unknown(current_token, preserve_statement_flags);
  }
};
Beautifier$5.prototype.handle_whitespace_and_comments = function(current_token, preserve_statement_flags) {
  var newlines = current_token.newlines;
  var keep_whitespace = this._options.keep_array_indentation && is_array(this._flags.mode);
  if (current_token.comments_before) {
    var comment_token = current_token.comments_before.next();
    while (comment_token) {
      this.handle_whitespace_and_comments(comment_token, preserve_statement_flags);
      this.handle_token(comment_token, preserve_statement_flags);
      comment_token = current_token.comments_before.next();
    }
  }
  if (keep_whitespace) {
    for (var i = 0; i < newlines; i += 1) {
      this.print_newline(i > 0, preserve_statement_flags);
    }
  } else {
    if (this._options.max_preserve_newlines && newlines > this._options.max_preserve_newlines) {
      newlines = this._options.max_preserve_newlines;
    }
    if (this._options.preserve_newlines) {
      if (newlines > 1) {
        this.print_newline(false, preserve_statement_flags);
        for (var j = 1; j < newlines; j += 1) {
          this.print_newline(true, preserve_statement_flags);
        }
      }
    }
  }
};
var newline_restricted_tokens = ["async", "break", "continue", "return", "throw", "yield"];
Beautifier$5.prototype.allow_wrap_or_preserved_newline = function(current_token, force_linewrap) {
  force_linewrap = force_linewrap === void 0 ? false : force_linewrap;
  if (this._output.just_added_newline()) {
    return;
  }
  var shouldPreserveOrForce = this._options.preserve_newlines && current_token.newlines || force_linewrap;
  var operatorLogicApplies = in_array$1(this._flags.last_token.text, positionable_operators) || in_array$1(current_token.text, positionable_operators);
  if (operatorLogicApplies) {
    var shouldPrintOperatorNewline = in_array$1(this._flags.last_token.text, positionable_operators) && in_array$1(this._options.operator_position, OPERATOR_POSITION_BEFORE_OR_PRESERVE) || in_array$1(current_token.text, positionable_operators);
    shouldPreserveOrForce = shouldPreserveOrForce && shouldPrintOperatorNewline;
  }
  if (shouldPreserveOrForce) {
    this.print_newline(false, true);
  } else if (this._options.wrap_line_length) {
    if (reserved_array(this._flags.last_token, newline_restricted_tokens)) {
      return;
    }
    this._output.set_wrap_point();
  }
};
Beautifier$5.prototype.print_newline = function(force_newline, preserve_statement_flags) {
  if (!preserve_statement_flags) {
    if (this._flags.last_token.text !== ";" && this._flags.last_token.text !== "," && this._flags.last_token.text !== "=" && (this._flags.last_token.type !== TOKEN$2.OPERATOR || this._flags.last_token.text === "--" || this._flags.last_token.text === "++")) {
      var next_token = this._tokens.peek();
      while (this._flags.mode === MODE.Statement && !(this._flags.if_block && reserved_word(next_token, "else")) && !this._flags.do_block) {
        this.restore_mode();
      }
    }
  }
  if (this._output.add_new_line(force_newline)) {
    this._flags.multiline_frame = true;
  }
};
Beautifier$5.prototype.print_token_line_indentation = function(current_token) {
  if (this._output.just_added_newline()) {
    if (this._options.keep_array_indentation && current_token.newlines && (current_token.text === "[" || is_array(this._flags.mode))) {
      this._output.current_line.set_indent(-1);
      this._output.current_line.push(current_token.whitespace_before);
      this._output.space_before_token = false;
    } else if (this._output.set_indent(this._flags.indentation_level, this._flags.alignment)) {
      this._flags.line_indent_level = this._flags.indentation_level;
    }
  }
};
Beautifier$5.prototype.print_token = function(current_token) {
  if (this._output.raw) {
    this._output.add_raw_token(current_token);
    return;
  }
  if (this._options.comma_first && current_token.previous && current_token.previous.type === TOKEN$2.COMMA && this._output.just_added_newline()) {
    if (this._output.previous_line.last() === ",") {
      var popped = this._output.previous_line.pop();
      if (this._output.previous_line.is_empty()) {
        this._output.previous_line.push(popped);
        this._output.trim(true);
        this._output.current_line.pop();
        this._output.trim();
      }
      this.print_token_line_indentation(current_token);
      this._output.add_token(",");
      this._output.space_before_token = true;
    }
  }
  this.print_token_line_indentation(current_token);
  this._output.non_breaking_space = true;
  this._output.add_token(current_token.text);
  if (this._output.previous_token_wrapped) {
    this._flags.multiline_frame = true;
  }
};
Beautifier$5.prototype.indent = function() {
  this._flags.indentation_level += 1;
  this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
};
Beautifier$5.prototype.deindent = function() {
  if (this._flags.indentation_level > 0 && (!this._flags.parent || this._flags.indentation_level > this._flags.parent.indentation_level)) {
    this._flags.indentation_level -= 1;
    this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
  }
};
Beautifier$5.prototype.set_mode = function(mode) {
  if (this._flags) {
    this._flag_store.push(this._flags);
    this._previous_flags = this._flags;
  } else {
    this._previous_flags = this.create_flags(null, mode);
  }
  this._flags = this.create_flags(this._previous_flags, mode);
  this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
};
Beautifier$5.prototype.restore_mode = function() {
  if (this._flag_store.length > 0) {
    this._previous_flags = this._flags;
    this._flags = this._flag_store.pop();
    if (this._previous_flags.mode === MODE.Statement) {
      remove_redundant_indentation(this._output, this._previous_flags);
    }
    this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
  }
};
Beautifier$5.prototype.start_of_object_property = function() {
  return this._flags.parent.mode === MODE.ObjectLiteral && this._flags.mode === MODE.Statement && (this._flags.last_token.text === ":" && this._flags.ternary_depth === 0 || reserved_array(this._flags.last_token, ["get", "set"]));
};
Beautifier$5.prototype.start_of_statement = function(current_token) {
  var start = false;
  start = start || reserved_array(this._flags.last_token, ["var", "let", "const"]) && current_token.type === TOKEN$2.WORD;
  start = start || reserved_word(this._flags.last_token, "do");
  start = start || !(this._flags.parent.mode === MODE.ObjectLiteral && this._flags.mode === MODE.Statement) && reserved_array(this._flags.last_token, newline_restricted_tokens) && !current_token.newlines;
  start = start || reserved_word(this._flags.last_token, "else") && !(reserved_word(current_token, "if") && !current_token.comments_before);
  start = start || this._flags.last_token.type === TOKEN$2.END_EXPR && (this._previous_flags.mode === MODE.ForInitializer || this._previous_flags.mode === MODE.Conditional);
  start = start || this._flags.last_token.type === TOKEN$2.WORD && this._flags.mode === MODE.BlockStatement && !this._flags.in_case && !(current_token.text === "--" || current_token.text === "++") && this._last_last_text !== "function" && current_token.type !== TOKEN$2.WORD && current_token.type !== TOKEN$2.RESERVED;
  start = start || this._flags.mode === MODE.ObjectLiteral && (this._flags.last_token.text === ":" && this._flags.ternary_depth === 0 || reserved_array(this._flags.last_token, ["get", "set"]));
  if (start) {
    this.set_mode(MODE.Statement);
    this.indent();
    this.handle_whitespace_and_comments(current_token, true);
    if (!this.start_of_object_property()) {
      this.allow_wrap_or_preserved_newline(
        current_token,
        reserved_array(current_token, ["do", "for", "if", "while"])
      );
    }
    return true;
  }
  return false;
};
Beautifier$5.prototype.handle_start_expr = function(current_token) {
  if (!this.start_of_statement(current_token)) {
    this.handle_whitespace_and_comments(current_token);
  }
  var next_mode = MODE.Expression;
  if (current_token.text === "[") {
    if (this._flags.last_token.type === TOKEN$2.WORD || this._flags.last_token.text === ")") {
      if (reserved_array(this._flags.last_token, line_starters)) {
        this._output.space_before_token = true;
      }
      this.print_token(current_token);
      this.set_mode(next_mode);
      this.indent();
      if (this._options.space_in_paren) {
        this._output.space_before_token = true;
      }
      return;
    }
    next_mode = MODE.ArrayLiteral;
    if (is_array(this._flags.mode)) {
      if (this._flags.last_token.text === "[" || this._flags.last_token.text === "," && (this._last_last_text === "]" || this._last_last_text === "}")) {
        if (!this._options.keep_array_indentation) {
          this.print_newline();
        }
      }
    }
    if (!in_array$1(this._flags.last_token.type, [TOKEN$2.START_EXPR, TOKEN$2.END_EXPR, TOKEN$2.WORD, TOKEN$2.OPERATOR, TOKEN$2.DOT])) {
      this._output.space_before_token = true;
    }
  } else {
    if (this._flags.last_token.type === TOKEN$2.RESERVED) {
      if (this._flags.last_token.text === "for") {
        this._output.space_before_token = this._options.space_before_conditional;
        next_mode = MODE.ForInitializer;
      } else if (in_array$1(this._flags.last_token.text, ["if", "while", "switch"])) {
        this._output.space_before_token = this._options.space_before_conditional;
        next_mode = MODE.Conditional;
      } else if (in_array$1(this._flags.last_word, ["await", "async"])) {
        this._output.space_before_token = true;
      } else if (this._flags.last_token.text === "import" && current_token.whitespace_before === "") {
        this._output.space_before_token = false;
      } else if (in_array$1(this._flags.last_token.text, line_starters) || this._flags.last_token.text === "catch") {
        this._output.space_before_token = true;
      }
    } else if (this._flags.last_token.type === TOKEN$2.EQUALS || this._flags.last_token.type === TOKEN$2.OPERATOR) {
      if (!this.start_of_object_property()) {
        this.allow_wrap_or_preserved_newline(current_token);
      }
    } else if (this._flags.last_token.type === TOKEN$2.WORD) {
      this._output.space_before_token = false;
      var peek_back_two = this._tokens.peek(-3);
      if (this._options.space_after_named_function && peek_back_two) {
        var peek_back_three = this._tokens.peek(-4);
        if (reserved_array(peek_back_two, ["async", "function"]) || peek_back_two.text === "*" && reserved_array(peek_back_three, ["async", "function"])) {
          this._output.space_before_token = true;
        } else if (this._flags.mode === MODE.ObjectLiteral) {
          if (peek_back_two.text === "{" || peek_back_two.text === "," || peek_back_two.text === "*" && (peek_back_three.text === "{" || peek_back_three.text === ",")) {
            this._output.space_before_token = true;
          }
        } else if (this._flags.parent && this._flags.parent.class_start_block) {
          this._output.space_before_token = true;
        }
      }
    } else {
      this.allow_wrap_or_preserved_newline(current_token);
    }
    if (this._flags.last_token.type === TOKEN$2.RESERVED && (this._flags.last_word === "function" || this._flags.last_word === "typeof") || this._flags.last_token.text === "*" && (in_array$1(this._last_last_text, ["function", "yield"]) || this._flags.mode === MODE.ObjectLiteral && in_array$1(this._last_last_text, ["{", ","]))) {
      this._output.space_before_token = this._options.space_after_anon_function;
    }
  }
  if (this._flags.last_token.text === ";" || this._flags.last_token.type === TOKEN$2.START_BLOCK) {
    this.print_newline();
  } else if (this._flags.last_token.type === TOKEN$2.END_EXPR || this._flags.last_token.type === TOKEN$2.START_EXPR || this._flags.last_token.type === TOKEN$2.END_BLOCK || this._flags.last_token.text === "." || this._flags.last_token.type === TOKEN$2.COMMA) {
    this.allow_wrap_or_preserved_newline(current_token, current_token.newlines);
  }
  this.print_token(current_token);
  this.set_mode(next_mode);
  if (this._options.space_in_paren) {
    this._output.space_before_token = true;
  }
  this.indent();
};
Beautifier$5.prototype.handle_end_expr = function(current_token) {
  while (this._flags.mode === MODE.Statement) {
    this.restore_mode();
  }
  this.handle_whitespace_and_comments(current_token);
  if (this._flags.multiline_frame) {
    this.allow_wrap_or_preserved_newline(
      current_token,
      current_token.text === "]" && is_array(this._flags.mode) && !this._options.keep_array_indentation
    );
  }
  if (this._options.space_in_paren) {
    if (this._flags.last_token.type === TOKEN$2.START_EXPR && !this._options.space_in_empty_paren) {
      this._output.trim();
      this._output.space_before_token = false;
    } else {
      this._output.space_before_token = true;
    }
  }
  this.deindent();
  this.print_token(current_token);
  this.restore_mode();
  remove_redundant_indentation(this._output, this._previous_flags);
  if (this._flags.do_while && this._previous_flags.mode === MODE.Conditional) {
    this._previous_flags.mode = MODE.Expression;
    this._flags.do_block = false;
    this._flags.do_while = false;
  }
};
Beautifier$5.prototype.handle_start_block = function(current_token) {
  this.handle_whitespace_and_comments(current_token);
  var next_token = this._tokens.peek();
  var second_token = this._tokens.peek(1);
  if (this._flags.last_word === "switch" && this._flags.last_token.type === TOKEN$2.END_EXPR) {
    this.set_mode(MODE.BlockStatement);
    this._flags.in_case_statement = true;
  } else if (this._flags.case_body) {
    this.set_mode(MODE.BlockStatement);
  } else if (second_token && (in_array$1(second_token.text, [":", ","]) && in_array$1(next_token.type, [TOKEN$2.STRING, TOKEN$2.WORD, TOKEN$2.RESERVED]) || in_array$1(next_token.text, ["get", "set", "..."]) && in_array$1(second_token.type, [TOKEN$2.WORD, TOKEN$2.RESERVED]))) {
    if (in_array$1(this._last_last_text, ["class", "interface"]) && !in_array$1(second_token.text, [":", ","])) {
      this.set_mode(MODE.BlockStatement);
    } else {
      this.set_mode(MODE.ObjectLiteral);
    }
  } else if (this._flags.last_token.type === TOKEN$2.OPERATOR && this._flags.last_token.text === "=>") {
    this.set_mode(MODE.BlockStatement);
  } else if (in_array$1(this._flags.last_token.type, [TOKEN$2.EQUALS, TOKEN$2.START_EXPR, TOKEN$2.COMMA, TOKEN$2.OPERATOR]) || reserved_array(this._flags.last_token, ["return", "throw", "import", "default"])) {
    this.set_mode(MODE.ObjectLiteral);
  } else {
    this.set_mode(MODE.BlockStatement);
  }
  if (this._flags.last_token) {
    if (reserved_array(this._flags.last_token.previous, ["class", "extends"])) {
      this._flags.class_start_block = true;
    }
  }
  var empty_braces = !next_token.comments_before && next_token.text === "}";
  var empty_anonymous_function = empty_braces && this._flags.last_word === "function" && this._flags.last_token.type === TOKEN$2.END_EXPR;
  if (this._options.brace_preserve_inline) {
    var index2 = 0;
    var check_token = null;
    this._flags.inline_frame = true;
    do {
      index2 += 1;
      check_token = this._tokens.peek(index2 - 1);
      if (check_token.newlines) {
        this._flags.inline_frame = false;
        break;
      }
    } while (check_token.type !== TOKEN$2.EOF && !(check_token.type === TOKEN$2.END_BLOCK && check_token.opened === current_token));
  }
  if ((this._options.brace_style === "expand" || this._options.brace_style === "none" && current_token.newlines) && !this._flags.inline_frame) {
    if (this._flags.last_token.type !== TOKEN$2.OPERATOR && (empty_anonymous_function || this._flags.last_token.type === TOKEN$2.EQUALS || reserved_array(this._flags.last_token, special_words) && this._flags.last_token.text !== "else")) {
      this._output.space_before_token = true;
    } else {
      this.print_newline(false, true);
    }
  } else {
    if (is_array(this._previous_flags.mode) && (this._flags.last_token.type === TOKEN$2.START_EXPR || this._flags.last_token.type === TOKEN$2.COMMA)) {
      if (this._flags.last_token.type === TOKEN$2.COMMA || this._options.space_in_paren) {
        this._output.space_before_token = true;
      }
      if (this._flags.last_token.type === TOKEN$2.COMMA || this._flags.last_token.type === TOKEN$2.START_EXPR && this._flags.inline_frame) {
        this.allow_wrap_or_preserved_newline(current_token);
        this._previous_flags.multiline_frame = this._previous_flags.multiline_frame || this._flags.multiline_frame;
        this._flags.multiline_frame = false;
      }
    }
    if (this._flags.last_token.type !== TOKEN$2.OPERATOR && this._flags.last_token.type !== TOKEN$2.START_EXPR) {
      if (in_array$1(this._flags.last_token.type, [TOKEN$2.START_BLOCK, TOKEN$2.SEMICOLON]) && !this._flags.inline_frame) {
        this.print_newline();
      } else {
        this._output.space_before_token = true;
      }
    }
  }
  this.print_token(current_token);
  this.indent();
  if (!empty_braces && !(this._options.brace_preserve_inline && this._flags.inline_frame)) {
    this.print_newline();
  }
};
Beautifier$5.prototype.handle_end_block = function(current_token) {
  this.handle_whitespace_and_comments(current_token);
  while (this._flags.mode === MODE.Statement) {
    this.restore_mode();
  }
  var empty_braces = this._flags.last_token.type === TOKEN$2.START_BLOCK;
  if (this._flags.inline_frame && !empty_braces) {
    this._output.space_before_token = true;
  } else if (this._options.brace_style === "expand") {
    if (!empty_braces) {
      this.print_newline();
    }
  } else {
    if (!empty_braces) {
      if (is_array(this._flags.mode) && this._options.keep_array_indentation) {
        this._options.keep_array_indentation = false;
        this.print_newline();
        this._options.keep_array_indentation = true;
      } else {
        this.print_newline();
      }
    }
  }
  this.restore_mode();
  this.print_token(current_token);
};
Beautifier$5.prototype.handle_word = function(current_token) {
  if (current_token.type === TOKEN$2.RESERVED) {
    if (in_array$1(current_token.text, ["set", "get"]) && this._flags.mode !== MODE.ObjectLiteral) {
      current_token.type = TOKEN$2.WORD;
    } else if (current_token.text === "import" && in_array$1(this._tokens.peek().text, ["(", "."])) {
      current_token.type = TOKEN$2.WORD;
    } else if (in_array$1(current_token.text, ["as", "from"]) && !this._flags.import_block) {
      current_token.type = TOKEN$2.WORD;
    } else if (this._flags.mode === MODE.ObjectLiteral) {
      var next_token = this._tokens.peek();
      if (next_token.text === ":") {
        current_token.type = TOKEN$2.WORD;
      }
    }
  }
  if (this.start_of_statement(current_token)) {
    if (reserved_array(this._flags.last_token, ["var", "let", "const"]) && current_token.type === TOKEN$2.WORD) {
      this._flags.declaration_statement = true;
    }
  } else if (current_token.newlines && !is_expression(this._flags.mode) && (this._flags.last_token.type !== TOKEN$2.OPERATOR || (this._flags.last_token.text === "--" || this._flags.last_token.text === "++")) && this._flags.last_token.type !== TOKEN$2.EQUALS && (this._options.preserve_newlines || !reserved_array(this._flags.last_token, ["var", "let", "const", "set", "get"]))) {
    this.handle_whitespace_and_comments(current_token);
    this.print_newline();
  } else {
    this.handle_whitespace_and_comments(current_token);
  }
  if (this._flags.do_block && !this._flags.do_while) {
    if (reserved_word(current_token, "while")) {
      this._output.space_before_token = true;
      this.print_token(current_token);
      this._output.space_before_token = true;
      this._flags.do_while = true;
      return;
    } else {
      this.print_newline();
      this._flags.do_block = false;
    }
  }
  if (this._flags.if_block) {
    if (!this._flags.else_block && reserved_word(current_token, "else")) {
      this._flags.else_block = true;
    } else {
      while (this._flags.mode === MODE.Statement) {
        this.restore_mode();
      }
      this._flags.if_block = false;
      this._flags.else_block = false;
    }
  }
  if (this._flags.in_case_statement && reserved_array(current_token, ["case", "default"])) {
    this.print_newline();
    if (!this._flags.case_block && (this._flags.case_body || this._options.jslint_happy)) {
      this.deindent();
    }
    this._flags.case_body = false;
    this.print_token(current_token);
    this._flags.in_case = true;
    return;
  }
  if (this._flags.last_token.type === TOKEN$2.COMMA || this._flags.last_token.type === TOKEN$2.START_EXPR || this._flags.last_token.type === TOKEN$2.EQUALS || this._flags.last_token.type === TOKEN$2.OPERATOR) {
    if (!this.start_of_object_property() && !(in_array$1(this._flags.last_token.text, ["+", "-"]) && this._last_last_text === ":" && this._flags.parent.mode === MODE.ObjectLiteral)) {
      this.allow_wrap_or_preserved_newline(current_token);
    }
  }
  if (reserved_word(current_token, "function")) {
    if (in_array$1(this._flags.last_token.text, ["}", ";"]) || this._output.just_added_newline() && !(in_array$1(this._flags.last_token.text, ["(", "[", "{", ":", "=", ","]) || this._flags.last_token.type === TOKEN$2.OPERATOR)) {
      if (!this._output.just_added_blankline() && !current_token.comments_before) {
        this.print_newline();
        this.print_newline(true);
      }
    }
    if (this._flags.last_token.type === TOKEN$2.RESERVED || this._flags.last_token.type === TOKEN$2.WORD) {
      if (reserved_array(this._flags.last_token, ["get", "set", "new", "export"]) || reserved_array(this._flags.last_token, newline_restricted_tokens)) {
        this._output.space_before_token = true;
      } else if (reserved_word(this._flags.last_token, "default") && this._last_last_text === "export") {
        this._output.space_before_token = true;
      } else if (this._flags.last_token.text === "declare") {
        this._output.space_before_token = true;
      } else {
        this.print_newline();
      }
    } else if (this._flags.last_token.type === TOKEN$2.OPERATOR || this._flags.last_token.text === "=") {
      this._output.space_before_token = true;
    } else if (!this._flags.multiline_frame && (is_expression(this._flags.mode) || is_array(this._flags.mode)))
      ;
    else {
      this.print_newline();
    }
    this.print_token(current_token);
    this._flags.last_word = current_token.text;
    return;
  }
  var prefix = "NONE";
  if (this._flags.last_token.type === TOKEN$2.END_BLOCK) {
    if (this._previous_flags.inline_frame) {
      prefix = "SPACE";
    } else if (!reserved_array(current_token, ["else", "catch", "finally", "from"])) {
      prefix = "NEWLINE";
    } else {
      if (this._options.brace_style === "expand" || this._options.brace_style === "end-expand" || this._options.brace_style === "none" && current_token.newlines) {
        prefix = "NEWLINE";
      } else {
        prefix = "SPACE";
        this._output.space_before_token = true;
      }
    }
  } else if (this._flags.last_token.type === TOKEN$2.SEMICOLON && this._flags.mode === MODE.BlockStatement) {
    prefix = "NEWLINE";
  } else if (this._flags.last_token.type === TOKEN$2.SEMICOLON && is_expression(this._flags.mode)) {
    prefix = "SPACE";
  } else if (this._flags.last_token.type === TOKEN$2.STRING) {
    prefix = "NEWLINE";
  } else if (this._flags.last_token.type === TOKEN$2.RESERVED || this._flags.last_token.type === TOKEN$2.WORD || this._flags.last_token.text === "*" && (in_array$1(this._last_last_text, ["function", "yield"]) || this._flags.mode === MODE.ObjectLiteral && in_array$1(this._last_last_text, ["{", ","]))) {
    prefix = "SPACE";
  } else if (this._flags.last_token.type === TOKEN$2.START_BLOCK) {
    if (this._flags.inline_frame) {
      prefix = "SPACE";
    } else {
      prefix = "NEWLINE";
    }
  } else if (this._flags.last_token.type === TOKEN$2.END_EXPR) {
    this._output.space_before_token = true;
    prefix = "NEWLINE";
  }
  if (reserved_array(current_token, line_starters) && this._flags.last_token.text !== ")") {
    if (this._flags.inline_frame || this._flags.last_token.text === "else" || this._flags.last_token.text === "export") {
      prefix = "SPACE";
    } else {
      prefix = "NEWLINE";
    }
  }
  if (reserved_array(current_token, ["else", "catch", "finally"])) {
    if ((!(this._flags.last_token.type === TOKEN$2.END_BLOCK && this._previous_flags.mode === MODE.BlockStatement) || this._options.brace_style === "expand" || this._options.brace_style === "end-expand" || this._options.brace_style === "none" && current_token.newlines) && !this._flags.inline_frame) {
      this.print_newline();
    } else {
      this._output.trim(true);
      var line = this._output.current_line;
      if (line.last() !== "}") {
        this.print_newline();
      }
      this._output.space_before_token = true;
    }
  } else if (prefix === "NEWLINE") {
    if (reserved_array(this._flags.last_token, special_words)) {
      this._output.space_before_token = true;
    } else if (this._flags.last_token.text === "declare" && reserved_array(current_token, ["var", "let", "const"])) {
      this._output.space_before_token = true;
    } else if (this._flags.last_token.type !== TOKEN$2.END_EXPR) {
      if ((this._flags.last_token.type !== TOKEN$2.START_EXPR || !reserved_array(current_token, ["var", "let", "const"])) && this._flags.last_token.text !== ":") {
        if (reserved_word(current_token, "if") && reserved_word(current_token.previous, "else")) {
          this._output.space_before_token = true;
        } else {
          this.print_newline();
        }
      }
    } else if (reserved_array(current_token, line_starters) && this._flags.last_token.text !== ")") {
      this.print_newline();
    }
  } else if (this._flags.multiline_frame && is_array(this._flags.mode) && this._flags.last_token.text === "," && this._last_last_text === "}") {
    this.print_newline();
  } else if (prefix === "SPACE") {
    this._output.space_before_token = true;
  }
  if (current_token.previous && (current_token.previous.type === TOKEN$2.WORD || current_token.previous.type === TOKEN$2.RESERVED)) {
    this._output.space_before_token = true;
  }
  this.print_token(current_token);
  this._flags.last_word = current_token.text;
  if (current_token.type === TOKEN$2.RESERVED) {
    if (current_token.text === "do") {
      this._flags.do_block = true;
    } else if (current_token.text === "if") {
      this._flags.if_block = true;
    } else if (current_token.text === "import") {
      this._flags.import_block = true;
    } else if (this._flags.import_block && reserved_word(current_token, "from")) {
      this._flags.import_block = false;
    }
  }
};
Beautifier$5.prototype.handle_semicolon = function(current_token) {
  if (this.start_of_statement(current_token)) {
    this._output.space_before_token = false;
  } else {
    this.handle_whitespace_and_comments(current_token);
  }
  var next_token = this._tokens.peek();
  while (this._flags.mode === MODE.Statement && !(this._flags.if_block && reserved_word(next_token, "else")) && !this._flags.do_block) {
    this.restore_mode();
  }
  if (this._flags.import_block) {
    this._flags.import_block = false;
  }
  this.print_token(current_token);
};
Beautifier$5.prototype.handle_string = function(current_token) {
  if (current_token.text.startsWith("`") && current_token.newlines === 0 && current_token.whitespace_before === "" && (current_token.previous.text === ")" || this._flags.last_token.type === TOKEN$2.WORD))
    ;
  else if (this.start_of_statement(current_token)) {
    this._output.space_before_token = true;
  } else {
    this.handle_whitespace_and_comments(current_token);
    if (this._flags.last_token.type === TOKEN$2.RESERVED || this._flags.last_token.type === TOKEN$2.WORD || this._flags.inline_frame) {
      this._output.space_before_token = true;
    } else if (this._flags.last_token.type === TOKEN$2.COMMA || this._flags.last_token.type === TOKEN$2.START_EXPR || this._flags.last_token.type === TOKEN$2.EQUALS || this._flags.last_token.type === TOKEN$2.OPERATOR) {
      if (!this.start_of_object_property()) {
        this.allow_wrap_or_preserved_newline(current_token);
      }
    } else if (current_token.text.startsWith("`") && this._flags.last_token.type === TOKEN$2.END_EXPR && (current_token.previous.text === "]" || current_token.previous.text === ")") && current_token.newlines === 0) {
      this._output.space_before_token = true;
    } else {
      this.print_newline();
    }
  }
  this.print_token(current_token);
};
Beautifier$5.prototype.handle_equals = function(current_token) {
  if (this.start_of_statement(current_token))
    ;
  else {
    this.handle_whitespace_and_comments(current_token);
  }
  if (this._flags.declaration_statement) {
    this._flags.declaration_assignment = true;
  }
  this._output.space_before_token = true;
  this.print_token(current_token);
  this._output.space_before_token = true;
};
Beautifier$5.prototype.handle_comma = function(current_token) {
  this.handle_whitespace_and_comments(current_token, true);
  this.print_token(current_token);
  this._output.space_before_token = true;
  if (this._flags.declaration_statement) {
    if (is_expression(this._flags.parent.mode)) {
      this._flags.declaration_assignment = false;
    }
    if (this._flags.declaration_assignment) {
      this._flags.declaration_assignment = false;
      this.print_newline(false, true);
    } else if (this._options.comma_first) {
      this.allow_wrap_or_preserved_newline(current_token);
    }
  } else if (this._flags.mode === MODE.ObjectLiteral || this._flags.mode === MODE.Statement && this._flags.parent.mode === MODE.ObjectLiteral) {
    if (this._flags.mode === MODE.Statement) {
      this.restore_mode();
    }
    if (!this._flags.inline_frame) {
      this.print_newline();
    }
  } else if (this._options.comma_first) {
    this.allow_wrap_or_preserved_newline(current_token);
  }
};
Beautifier$5.prototype.handle_operator = function(current_token) {
  var isGeneratorAsterisk = current_token.text === "*" && (reserved_array(this._flags.last_token, ["function", "yield"]) || in_array$1(this._flags.last_token.type, [TOKEN$2.START_BLOCK, TOKEN$2.COMMA, TOKEN$2.END_BLOCK, TOKEN$2.SEMICOLON]));
  var isUnary = in_array$1(current_token.text, ["-", "+"]) && (in_array$1(this._flags.last_token.type, [TOKEN$2.START_BLOCK, TOKEN$2.START_EXPR, TOKEN$2.EQUALS, TOKEN$2.OPERATOR]) || in_array$1(this._flags.last_token.text, line_starters) || this._flags.last_token.text === ",");
  if (this.start_of_statement(current_token))
    ;
  else {
    var preserve_statement_flags = !isGeneratorAsterisk;
    this.handle_whitespace_and_comments(current_token, preserve_statement_flags);
  }
  if (current_token.text === "*" && this._flags.last_token.type === TOKEN$2.DOT) {
    this.print_token(current_token);
    return;
  }
  if (current_token.text === "::") {
    this.print_token(current_token);
    return;
  }
  if (in_array$1(current_token.text, ["-", "+"]) && this.start_of_object_property()) {
    this.print_token(current_token);
    return;
  }
  if (this._flags.last_token.type === TOKEN$2.OPERATOR && in_array$1(this._options.operator_position, OPERATOR_POSITION_BEFORE_OR_PRESERVE)) {
    this.allow_wrap_or_preserved_newline(current_token);
  }
  if (current_token.text === ":" && this._flags.in_case) {
    this.print_token(current_token);
    this._flags.in_case = false;
    this._flags.case_body = true;
    if (this._tokens.peek().type !== TOKEN$2.START_BLOCK) {
      this.indent();
      this.print_newline();
      this._flags.case_block = false;
    } else {
      this._flags.case_block = true;
      this._output.space_before_token = true;
    }
    return;
  }
  var space_before = true;
  var space_after = true;
  var in_ternary = false;
  if (current_token.text === ":") {
    if (this._flags.ternary_depth === 0) {
      space_before = false;
    } else {
      this._flags.ternary_depth -= 1;
      in_ternary = true;
    }
  } else if (current_token.text === "?") {
    this._flags.ternary_depth += 1;
  }
  if (!isUnary && !isGeneratorAsterisk && this._options.preserve_newlines && in_array$1(current_token.text, positionable_operators)) {
    var isColon = current_token.text === ":";
    var isTernaryColon = isColon && in_ternary;
    var isOtherColon = isColon && !in_ternary;
    switch (this._options.operator_position) {
      case OPERATOR_POSITION.before_newline:
        this._output.space_before_token = !isOtherColon;
        this.print_token(current_token);
        if (!isColon || isTernaryColon) {
          this.allow_wrap_or_preserved_newline(current_token);
        }
        this._output.space_before_token = true;
        return;
      case OPERATOR_POSITION.after_newline:
        this._output.space_before_token = true;
        if (!isColon || isTernaryColon) {
          if (this._tokens.peek().newlines) {
            this.print_newline(false, true);
          } else {
            this.allow_wrap_or_preserved_newline(current_token);
          }
        } else {
          this._output.space_before_token = false;
        }
        this.print_token(current_token);
        this._output.space_before_token = true;
        return;
      case OPERATOR_POSITION.preserve_newline:
        if (!isOtherColon) {
          this.allow_wrap_or_preserved_newline(current_token);
        }
        space_before = !(this._output.just_added_newline() || isOtherColon);
        this._output.space_before_token = space_before;
        this.print_token(current_token);
        this._output.space_before_token = true;
        return;
    }
  }
  if (isGeneratorAsterisk) {
    this.allow_wrap_or_preserved_newline(current_token);
    space_before = false;
    var next_token = this._tokens.peek();
    space_after = next_token && in_array$1(next_token.type, [TOKEN$2.WORD, TOKEN$2.RESERVED]);
  } else if (current_token.text === "...") {
    this.allow_wrap_or_preserved_newline(current_token);
    space_before = this._flags.last_token.type === TOKEN$2.START_BLOCK;
    space_after = false;
  } else if (in_array$1(current_token.text, ["--", "++", "!", "~"]) || isUnary) {
    if (this._flags.last_token.type === TOKEN$2.COMMA || this._flags.last_token.type === TOKEN$2.START_EXPR) {
      this.allow_wrap_or_preserved_newline(current_token);
    }
    space_before = false;
    space_after = false;
    if (current_token.newlines && (current_token.text === "--" || current_token.text === "++" || current_token.text === "~")) {
      var new_line_needed = reserved_array(this._flags.last_token, special_words) && current_token.newlines;
      if (new_line_needed && (this._previous_flags.if_block || this._previous_flags.else_block)) {
        this.restore_mode();
      }
      this.print_newline(new_line_needed, true);
    }
    if (this._flags.last_token.text === ";" && is_expression(this._flags.mode)) {
      space_before = true;
    }
    if (this._flags.last_token.type === TOKEN$2.RESERVED) {
      space_before = true;
    } else if (this._flags.last_token.type === TOKEN$2.END_EXPR) {
      space_before = !(this._flags.last_token.text === "]" && (current_token.text === "--" || current_token.text === "++"));
    } else if (this._flags.last_token.type === TOKEN$2.OPERATOR) {
      space_before = in_array$1(current_token.text, ["--", "-", "++", "+"]) && in_array$1(this._flags.last_token.text, ["--", "-", "++", "+"]);
      if (in_array$1(current_token.text, ["+", "-"]) && in_array$1(this._flags.last_token.text, ["--", "++"])) {
        space_after = true;
      }
    }
    if ((this._flags.mode === MODE.BlockStatement && !this._flags.inline_frame || this._flags.mode === MODE.Statement) && (this._flags.last_token.text === "{" || this._flags.last_token.text === ";")) {
      this.print_newline();
    }
  }
  this._output.space_before_token = this._output.space_before_token || space_before;
  this.print_token(current_token);
  this._output.space_before_token = space_after;
};
Beautifier$5.prototype.handle_block_comment = function(current_token, preserve_statement_flags) {
  if (this._output.raw) {
    this._output.add_raw_token(current_token);
    if (current_token.directives && current_token.directives.preserve === "end") {
      this._output.raw = this._options.test_output_raw;
    }
    return;
  }
  if (current_token.directives) {
    this.print_newline(false, preserve_statement_flags);
    this.print_token(current_token);
    if (current_token.directives.preserve === "start") {
      this._output.raw = true;
    }
    this.print_newline(false, true);
    return;
  }
  if (!acorn.newline.test(current_token.text) && !current_token.newlines) {
    this._output.space_before_token = true;
    this.print_token(current_token);
    this._output.space_before_token = true;
    return;
  } else {
    this.print_block_commment(current_token, preserve_statement_flags);
  }
};
Beautifier$5.prototype.print_block_commment = function(current_token, preserve_statement_flags) {
  var lines = split_linebreaks(current_token.text);
  var j;
  var javadoc = false;
  var starless = false;
  var lastIndent = current_token.whitespace_before;
  var lastIndentLength = lastIndent.length;
  this.print_newline(false, preserve_statement_flags);
  this.print_token_line_indentation(current_token);
  this._output.add_token(lines[0]);
  this.print_newline(false, preserve_statement_flags);
  if (lines.length > 1) {
    lines = lines.slice(1);
    javadoc = all_lines_start_with(lines, "*");
    starless = each_line_matches_indent(lines, lastIndent);
    if (javadoc) {
      this._flags.alignment = 1;
    }
    for (j = 0; j < lines.length; j++) {
      if (javadoc) {
        this.print_token_line_indentation(current_token);
        this._output.add_token(ltrim(lines[j]));
      } else if (starless && lines[j]) {
        this.print_token_line_indentation(current_token);
        this._output.add_token(lines[j].substring(lastIndentLength));
      } else {
        this._output.current_line.set_indent(-1);
        this._output.add_token(lines[j]);
      }
      this.print_newline(false, preserve_statement_flags);
    }
    this._flags.alignment = 0;
  }
};
Beautifier$5.prototype.handle_comment = function(current_token, preserve_statement_flags) {
  if (current_token.newlines) {
    this.print_newline(false, preserve_statement_flags);
  } else {
    this._output.trim(true);
  }
  this._output.space_before_token = true;
  this.print_token(current_token);
  this.print_newline(false, preserve_statement_flags);
};
Beautifier$5.prototype.handle_dot = function(current_token) {
  if (this.start_of_statement(current_token))
    ;
  else {
    this.handle_whitespace_and_comments(current_token, true);
  }
  if (this._flags.last_token.text.match("^[0-9]+$")) {
    this._output.space_before_token = true;
  }
  if (reserved_array(this._flags.last_token, special_words)) {
    this._output.space_before_token = false;
  } else {
    this.allow_wrap_or_preserved_newline(
      current_token,
      this._flags.last_token.text === ")" && this._options.break_chained_methods
    );
  }
  if (this._options.unindent_chained_methods && this._output.just_added_newline()) {
    this.deindent();
  }
  this.print_token(current_token);
};
Beautifier$5.prototype.handle_unknown = function(current_token, preserve_statement_flags) {
  this.print_token(current_token);
  if (current_token.text[current_token.text.length - 1] === "\n") {
    this.print_newline(false, preserve_statement_flags);
  }
};
Beautifier$5.prototype.handle_eof = function(current_token) {
  while (this._flags.mode === MODE.Statement) {
    this.restore_mode();
  }
  this.handle_whitespace_and_comments(current_token);
};
beautifier$2.Beautifier = Beautifier$5;
var Beautifier$4 = beautifier$2.Beautifier, Options$6 = options$3.Options;
function js_beautify$1(js_source_text, options2) {
  var beautifier2 = new Beautifier$4(js_source_text, options2);
  return beautifier2.beautify();
}
javascript.exports = js_beautify$1;
javascript.exports.defaultOptions = function() {
  return new Options$6();
};
var css = { exports: {} };
var beautifier$1 = {};
var options$1 = {};
var BaseOptions$1 = options$2.Options;
function Options$5(options2) {
  BaseOptions$1.call(this, options2, "css");
  this.selector_separator_newline = this._get_boolean("selector_separator_newline", true);
  this.newline_between_rules = this._get_boolean("newline_between_rules", true);
  var space_around_selector_separator = this._get_boolean("space_around_selector_separator");
  this.space_around_combinator = this._get_boolean("space_around_combinator") || space_around_selector_separator;
  var brace_style_split = this._get_selection_list("brace_style", ["collapse", "expand", "end-expand", "none", "preserve-inline"]);
  this.brace_style = "collapse";
  for (var bs = 0; bs < brace_style_split.length; bs++) {
    if (brace_style_split[bs] !== "expand") {
      this.brace_style = "collapse";
    } else {
      this.brace_style = brace_style_split[bs];
    }
  }
}
Options$5.prototype = new BaseOptions$1();
options$1.Options = Options$5;
var Options$4 = options$1.Options;
var Output$1 = output.Output;
var InputScanner = inputscanner.InputScanner;
var Directives$1 = directives.Directives;
var directives_core$1 = new Directives$1(/\/\*/, /\*\//);
var lineBreak$1 = /\r\n|[\r\n]/;
var allLineBreaks$1 = /\r\n|[\r\n]/g;
var whitespaceChar = /\s/;
var whitespacePattern = /(?:\s|\n)+/g;
var block_comment_pattern = /\/\*(?:[\s\S]*?)((?:\*\/)|$)/g;
var comment_pattern = /\/\/(?:[^\n\r\u2028\u2029]*)/g;
function Beautifier$3(source_text, options2) {
  this._source_text = source_text || "";
  this._options = new Options$4(options2);
  this._ch = null;
  this._input = null;
  this.NESTED_AT_RULE = {
    "page": true,
    "font-face": true,
    "keyframes": true,
    "media": true,
    "supports": true,
    "document": true
  };
  this.CONDITIONAL_GROUP_RULE = {
    "media": true,
    "supports": true,
    "document": true
  };
  this.NON_SEMICOLON_NEWLINE_PROPERTY = [
    "grid-template-areas",
    "grid-template"
  ];
}
Beautifier$3.prototype.eatString = function(endChars) {
  var result = "";
  this._ch = this._input.next();
  while (this._ch) {
    result += this._ch;
    if (this._ch === "\\") {
      result += this._input.next();
    } else if (endChars.indexOf(this._ch) !== -1 || this._ch === "\n") {
      break;
    }
    this._ch = this._input.next();
  }
  return result;
};
Beautifier$3.prototype.eatWhitespace = function(allowAtLeastOneNewLine) {
  var result = whitespaceChar.test(this._input.peek());
  var newline_count = 0;
  while (whitespaceChar.test(this._input.peek())) {
    this._ch = this._input.next();
    if (allowAtLeastOneNewLine && this._ch === "\n") {
      if (newline_count === 0 || newline_count < this._options.max_preserve_newlines) {
        newline_count++;
        this._output.add_new_line(true);
      }
    }
  }
  return result;
};
Beautifier$3.prototype.foundNestedPseudoClass = function() {
  var openParen = 0;
  var i = 1;
  var ch = this._input.peek(i);
  while (ch) {
    if (ch === "{") {
      return true;
    } else if (ch === "(") {
      openParen += 1;
    } else if (ch === ")") {
      if (openParen === 0) {
        return false;
      }
      openParen -= 1;
    } else if (ch === ";" || ch === "}") {
      return false;
    }
    i++;
    ch = this._input.peek(i);
  }
  return false;
};
Beautifier$3.prototype.print_string = function(output_string) {
  this._output.set_indent(this._indentLevel);
  this._output.non_breaking_space = true;
  this._output.add_token(output_string);
};
Beautifier$3.prototype.preserveSingleSpace = function(isAfterSpace) {
  if (isAfterSpace) {
    this._output.space_before_token = true;
  }
};
Beautifier$3.prototype.indent = function() {
  this._indentLevel++;
};
Beautifier$3.prototype.outdent = function() {
  if (this._indentLevel > 0) {
    this._indentLevel--;
  }
};
Beautifier$3.prototype.beautify = function() {
  if (this._options.disabled) {
    return this._source_text;
  }
  var source_text = this._source_text;
  var eol = this._options.eol;
  if (eol === "auto") {
    eol = "\n";
    if (source_text && lineBreak$1.test(source_text || "")) {
      eol = source_text.match(lineBreak$1)[0];
    }
  }
  source_text = source_text.replace(allLineBreaks$1, "\n");
  var baseIndentString = source_text.match(/^[\t ]*/)[0];
  this._output = new Output$1(this._options, baseIndentString);
  this._input = new InputScanner(source_text);
  this._indentLevel = 0;
  this._nestedLevel = 0;
  this._ch = null;
  var parenLevel = 0;
  var insideRule = false;
  var insidePropertyValue = false;
  var enteringConditionalGroup = false;
  var insideNonNestedAtRule = false;
  var insideScssMap = false;
  var topCharacter = this._ch;
  var insideNonSemiColonValues = false;
  var whitespace;
  var isAfterSpace;
  var previous_ch;
  while (true) {
    whitespace = this._input.read(whitespacePattern);
    isAfterSpace = whitespace !== "";
    previous_ch = topCharacter;
    this._ch = this._input.next();
    if (this._ch === "\\" && this._input.hasNext()) {
      this._ch += this._input.next();
    }
    topCharacter = this._ch;
    if (!this._ch) {
      break;
    } else if (this._ch === "/" && this._input.peek() === "*") {
      this._output.add_new_line();
      this._input.back();
      var comment = this._input.read(block_comment_pattern);
      var directives2 = directives_core$1.get_directives(comment);
      if (directives2 && directives2.ignore === "start") {
        comment += directives_core$1.readIgnored(this._input);
      }
      this.print_string(comment);
      this.eatWhitespace(true);
      this._output.add_new_line();
    } else if (this._ch === "/" && this._input.peek() === "/") {
      this._output.space_before_token = true;
      this._input.back();
      this.print_string(this._input.read(comment_pattern));
      this.eatWhitespace(true);
    } else if (this._ch === "$") {
      this.preserveSingleSpace(isAfterSpace);
      this.print_string(this._ch);
      var variable = this._input.peekUntilAfter(/[: ,;{}()[\]\/='"]/g);
      if (variable.match(/[ :]$/)) {
        variable = this.eatString(": ").replace(/\s+$/, "");
        this.print_string(variable);
        this._output.space_before_token = true;
      }
      if (parenLevel === 0 && variable.indexOf(":") !== -1) {
        insidePropertyValue = true;
        this.indent();
      }
    } else if (this._ch === "@") {
      this.preserveSingleSpace(isAfterSpace);
      if (this._input.peek() === "{") {
        this.print_string(this._ch + this.eatString("}"));
      } else {
        this.print_string(this._ch);
        var variableOrRule = this._input.peekUntilAfter(/[: ,;{}()[\]\/='"]/g);
        if (variableOrRule.match(/[ :]$/)) {
          variableOrRule = this.eatString(": ").replace(/\s+$/, "");
          this.print_string(variableOrRule);
          this._output.space_before_token = true;
        }
        if (parenLevel === 0 && variableOrRule.indexOf(":") !== -1) {
          insidePropertyValue = true;
          this.indent();
        } else if (variableOrRule in this.NESTED_AT_RULE) {
          this._nestedLevel += 1;
          if (variableOrRule in this.CONDITIONAL_GROUP_RULE) {
            enteringConditionalGroup = true;
          }
        } else if (parenLevel === 0 && !insidePropertyValue) {
          insideNonNestedAtRule = true;
        }
      }
    } else if (this._ch === "#" && this._input.peek() === "{") {
      this.preserveSingleSpace(isAfterSpace);
      this.print_string(this._ch + this.eatString("}"));
    } else if (this._ch === "{") {
      if (insidePropertyValue) {
        insidePropertyValue = false;
        this.outdent();
      }
      insideNonNestedAtRule = false;
      if (enteringConditionalGroup) {
        enteringConditionalGroup = false;
        insideRule = this._indentLevel >= this._nestedLevel;
      } else {
        insideRule = this._indentLevel >= this._nestedLevel - 1;
      }
      if (this._options.newline_between_rules && insideRule) {
        if (this._output.previous_line && this._output.previous_line.item(-1) !== "{") {
          this._output.ensure_empty_line_above("/", ",");
        }
      }
      this._output.space_before_token = true;
      if (this._options.brace_style === "expand") {
        this._output.add_new_line();
        this.print_string(this._ch);
        this.indent();
        this._output.set_indent(this._indentLevel);
      } else {
        if (previous_ch === "(") {
          this._output.space_before_token = false;
        } else if (previous_ch !== ",") {
          this.indent();
        }
        this.print_string(this._ch);
      }
      this.eatWhitespace(true);
      this._output.add_new_line();
    } else if (this._ch === "}") {
      this.outdent();
      this._output.add_new_line();
      if (previous_ch === "{") {
        this._output.trim(true);
      }
      if (insidePropertyValue) {
        this.outdent();
        insidePropertyValue = false;
      }
      this.print_string(this._ch);
      insideRule = false;
      if (this._nestedLevel) {
        this._nestedLevel--;
      }
      this.eatWhitespace(true);
      this._output.add_new_line();
      if (this._options.newline_between_rules && !this._output.just_added_blankline()) {
        if (this._input.peek() !== "}") {
          this._output.add_new_line(true);
        }
      }
      if (this._input.peek() === ")") {
        this._output.trim(true);
        if (this._options.brace_style === "expand") {
          this._output.add_new_line(true);
        }
      }
    } else if (this._ch === ":") {
      for (var i = 0; i < this.NON_SEMICOLON_NEWLINE_PROPERTY.length; i++) {
        if (this._input.lookBack(this.NON_SEMICOLON_NEWLINE_PROPERTY[i])) {
          insideNonSemiColonValues = true;
          break;
        }
      }
      if ((insideRule || enteringConditionalGroup) && !(this._input.lookBack("&") || this.foundNestedPseudoClass()) && !this._input.lookBack("(") && !insideNonNestedAtRule && parenLevel === 0) {
        this.print_string(":");
        if (!insidePropertyValue) {
          insidePropertyValue = true;
          this._output.space_before_token = true;
          this.eatWhitespace(true);
          this.indent();
        }
      } else {
        if (this._input.lookBack(" ")) {
          this._output.space_before_token = true;
        }
        if (this._input.peek() === ":") {
          this._ch = this._input.next();
          this.print_string("::");
        } else {
          this.print_string(":");
        }
      }
    } else if (this._ch === '"' || this._ch === "'") {
      var preserveQuoteSpace = previous_ch === '"' || previous_ch === "'";
      this.preserveSingleSpace(preserveQuoteSpace || isAfterSpace);
      this.print_string(this._ch + this.eatString(this._ch));
      this.eatWhitespace(true);
    } else if (this._ch === ";") {
      insideNonSemiColonValues = false;
      if (parenLevel === 0) {
        if (insidePropertyValue) {
          this.outdent();
          insidePropertyValue = false;
        }
        insideNonNestedAtRule = false;
        this.print_string(this._ch);
        this.eatWhitespace(true);
        if (this._input.peek() !== "/") {
          this._output.add_new_line();
        }
      } else {
        this.print_string(this._ch);
        this.eatWhitespace(true);
        this._output.space_before_token = true;
      }
    } else if (this._ch === "(") {
      if (this._input.lookBack("url")) {
        this.print_string(this._ch);
        this.eatWhitespace();
        parenLevel++;
        this.indent();
        this._ch = this._input.next();
        if (this._ch === ")" || this._ch === '"' || this._ch === "'") {
          this._input.back();
        } else if (this._ch) {
          this.print_string(this._ch + this.eatString(")"));
          if (parenLevel) {
            parenLevel--;
            this.outdent();
          }
        }
      } else {
        var space_needed = false;
        if (this._input.lookBack("with")) {
          space_needed = true;
        }
        this.preserveSingleSpace(isAfterSpace || space_needed);
        this.print_string(this._ch);
        if (insidePropertyValue && previous_ch === "$" && this._options.selector_separator_newline) {
          this._output.add_new_line();
          insideScssMap = true;
        } else {
          this.eatWhitespace();
          parenLevel++;
          this.indent();
        }
      }
    } else if (this._ch === ")") {
      if (parenLevel) {
        parenLevel--;
        this.outdent();
      }
      if (insideScssMap && this._input.peek() === ";" && this._options.selector_separator_newline) {
        insideScssMap = false;
        this.outdent();
        this._output.add_new_line();
      }
      this.print_string(this._ch);
    } else if (this._ch === ",") {
      this.print_string(this._ch);
      this.eatWhitespace(true);
      if (this._options.selector_separator_newline && (!insidePropertyValue || insideScssMap) && parenLevel === 0 && !insideNonNestedAtRule) {
        this._output.add_new_line();
      } else {
        this._output.space_before_token = true;
      }
    } else if ((this._ch === ">" || this._ch === "+" || this._ch === "~") && !insidePropertyValue && parenLevel === 0) {
      if (this._options.space_around_combinator) {
        this._output.space_before_token = true;
        this.print_string(this._ch);
        this._output.space_before_token = true;
      } else {
        this.print_string(this._ch);
        this.eatWhitespace();
        if (this._ch && whitespaceChar.test(this._ch)) {
          this._ch = "";
        }
      }
    } else if (this._ch === "]") {
      this.print_string(this._ch);
    } else if (this._ch === "[") {
      this.preserveSingleSpace(isAfterSpace);
      this.print_string(this._ch);
    } else if (this._ch === "=") {
      this.eatWhitespace();
      this.print_string("=");
      if (whitespaceChar.test(this._ch)) {
        this._ch = "";
      }
    } else if (this._ch === "!" && !this._input.lookBack("\\")) {
      this._output.space_before_token = true;
      this.print_string(this._ch);
    } else {
      var preserveAfterSpace = previous_ch === '"' || previous_ch === "'";
      this.preserveSingleSpace(preserveAfterSpace || isAfterSpace);
      this.print_string(this._ch);
      if (!this._output.just_added_newline() && this._input.peek() === "\n" && insideNonSemiColonValues) {
        this._output.add_new_line();
      }
    }
  }
  var sweetCode = this._output.get_code(eol);
  return sweetCode;
};
beautifier$1.Beautifier = Beautifier$3;
var Beautifier$2 = beautifier$1.Beautifier, Options$3 = options$1.Options;
function css_beautify$1(source_text, options2) {
  var beautifier2 = new Beautifier$2(source_text, options2);
  return beautifier2.beautify();
}
css.exports = css_beautify$1;
css.exports.defaultOptions = function() {
  return new Options$3();
};
var html = { exports: {} };
var beautifier = {};
var options = {};
var BaseOptions = options$2.Options;
function Options$2(options2) {
  BaseOptions.call(this, options2, "html");
  if (this.templating.length === 1 && this.templating[0] === "auto") {
    this.templating = ["django", "erb", "handlebars", "php"];
  }
  this.indent_inner_html = this._get_boolean("indent_inner_html");
  this.indent_body_inner_html = this._get_boolean("indent_body_inner_html", true);
  this.indent_head_inner_html = this._get_boolean("indent_head_inner_html", true);
  this.indent_handlebars = this._get_boolean("indent_handlebars", true);
  this.wrap_attributes = this._get_selection(
    "wrap_attributes",
    ["auto", "force", "force-aligned", "force-expand-multiline", "aligned-multiple", "preserve", "preserve-aligned"]
  );
  this.wrap_attributes_min_attrs = this._get_number("wrap_attributes_min_attrs", 2);
  this.wrap_attributes_indent_size = this._get_number("wrap_attributes_indent_size", this.indent_size);
  this.extra_liners = this._get_array("extra_liners", ["head", "body", "/html"]);
  this.inline = this._get_array("inline", [
    "a",
    "abbr",
    "area",
    "audio",
    "b",
    "bdi",
    "bdo",
    "br",
    "button",
    "canvas",
    "cite",
    "code",
    "data",
    "datalist",
    "del",
    "dfn",
    "em",
    "embed",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "kbd",
    "keygen",
    "label",
    "map",
    "mark",
    "math",
    "meter",
    "noscript",
    "object",
    "output",
    "progress",
    "q",
    "ruby",
    "s",
    "samp",
    "select",
    "small",
    "span",
    "strong",
    "sub",
    "sup",
    "svg",
    "template",
    "textarea",
    "time",
    "u",
    "var",
    "video",
    "wbr",
    "text",
    "acronym",
    "big",
    "strike",
    "tt"
  ]);
  this.inline_custom_elements = this._get_boolean("inline_custom_elements", true);
  this.void_elements = this._get_array("void_elements", [
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "keygen",
    "link",
    "menuitem",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
    "!doctype",
    "?xml",
    "basefont",
    "isindex"
  ]);
  this.unformatted = this._get_array("unformatted", []);
  this.content_unformatted = this._get_array("content_unformatted", [
    "pre",
    "textarea"
  ]);
  this.unformatted_content_delimiter = this._get_characters("unformatted_content_delimiter");
  this.indent_scripts = this._get_selection("indent_scripts", ["normal", "keep", "separate"]);
}
Options$2.prototype = new BaseOptions();
options.Options = Options$2;
var tokenizer = {};
var BaseTokenizer = tokenizer$1.Tokenizer;
var BASETOKEN = tokenizer$1.TOKEN;
var Directives = directives.Directives;
var TemplatablePattern = templatablepattern.TemplatablePattern;
var Pattern = pattern.Pattern;
var TOKEN$1 = {
  TAG_OPEN: "TK_TAG_OPEN",
  TAG_CLOSE: "TK_TAG_CLOSE",
  CONTROL_FLOW_OPEN: "TK_CONTROL_FLOW_OPEN",
  CONTROL_FLOW_CLOSE: "TK_CONTROL_FLOW_CLOSE",
  ATTRIBUTE: "TK_ATTRIBUTE",
  EQUALS: "TK_EQUALS",
  VALUE: "TK_VALUE",
  COMMENT: "TK_COMMENT",
  TEXT: "TK_TEXT",
  UNKNOWN: "TK_UNKNOWN",
  START: BASETOKEN.START,
  RAW: BASETOKEN.RAW,
  EOF: BASETOKEN.EOF
};
var directives_core = new Directives(/<\!--/, /-->/);
var Tokenizer$1 = function(input_string, options2) {
  BaseTokenizer.call(this, input_string, options2);
  this._current_tag_name = "";
  var templatable_reader = new TemplatablePattern(this._input).read_options(this._options);
  var pattern_reader = new Pattern(this._input);
  this.__patterns = {
    word: templatable_reader.until(/[\n\r\t <]/),
    word_control_flow_close_excluded: templatable_reader.until(/[\n\r\t <}]/),
    single_quote: templatable_reader.until_after(/'/),
    double_quote: templatable_reader.until_after(/"/),
    attribute: templatable_reader.until(/[\n\r\t =>]|\/>/),
    element_name: templatable_reader.until(/[\n\r\t >\/]/),
    angular_control_flow_start: pattern_reader.matching(/\@[a-zA-Z]+[^({]*[({]/),
    handlebars_comment: pattern_reader.starting_with(/{{!--/).until_after(/--}}/),
    handlebars: pattern_reader.starting_with(/{{/).until_after(/}}/),
    handlebars_open: pattern_reader.until(/[\n\r\t }]/),
    handlebars_raw_close: pattern_reader.until(/}}/),
    comment: pattern_reader.starting_with(/<!--/).until_after(/-->/),
    cdata: pattern_reader.starting_with(/<!\[CDATA\[/).until_after(/]]>/),
    conditional_comment: pattern_reader.starting_with(/<!\[/).until_after(/]>/),
    processing: pattern_reader.starting_with(/<\?/).until_after(/\?>/)
  };
  if (this._options.indent_handlebars) {
    this.__patterns.word = this.__patterns.word.exclude("handlebars");
    this.__patterns.word_control_flow_close_excluded = this.__patterns.word_control_flow_close_excluded.exclude("handlebars");
  }
  this._unformatted_content_delimiter = null;
  if (this._options.unformatted_content_delimiter) {
    var literal_regexp = this._input.get_literal_regexp(this._options.unformatted_content_delimiter);
    this.__patterns.unformatted_content_delimiter = pattern_reader.matching(literal_regexp).until_after(literal_regexp);
  }
};
Tokenizer$1.prototype = new BaseTokenizer();
Tokenizer$1.prototype._is_comment = function(current_token) {
  return false;
};
Tokenizer$1.prototype._is_opening = function(current_token) {
  return current_token.type === TOKEN$1.TAG_OPEN || current_token.type === TOKEN$1.CONTROL_FLOW_OPEN;
};
Tokenizer$1.prototype._is_closing = function(current_token, open_token) {
  return current_token.type === TOKEN$1.TAG_CLOSE && (open_token && ((current_token.text === ">" || current_token.text === "/>") && open_token.text[0] === "<" || current_token.text === "}}" && open_token.text[0] === "{" && open_token.text[1] === "{")) || current_token.type === TOKEN$1.CONTROL_FLOW_CLOSE && (current_token.text === "}" && open_token.text.endsWith("{"));
};
Tokenizer$1.prototype._reset = function() {
  this._current_tag_name = "";
};
Tokenizer$1.prototype._get_next_token = function(previous_token, open_token) {
  var token2 = null;
  this._readWhitespace();
  var c = this._input.peek();
  if (c === null) {
    return this._create_token(TOKEN$1.EOF, "");
  }
  token2 = token2 || this._read_open_handlebars(c, open_token);
  token2 = token2 || this._read_attribute(c, previous_token, open_token);
  token2 = token2 || this._read_close(c, open_token);
  token2 = token2 || this._read_script_and_style(c, previous_token);
  token2 = token2 || this._read_control_flows(c, open_token);
  token2 = token2 || this._read_raw_content(c, previous_token, open_token);
  token2 = token2 || this._read_content_word(c, open_token);
  token2 = token2 || this._read_comment_or_cdata(c);
  token2 = token2 || this._read_processing(c);
  token2 = token2 || this._read_open(c, open_token);
  token2 = token2 || this._create_token(TOKEN$1.UNKNOWN, this._input.next());
  return token2;
};
Tokenizer$1.prototype._read_comment_or_cdata = function(c) {
  var token2 = null;
  var resulting_string = null;
  var directives2 = null;
  if (c === "<") {
    var peek1 = this._input.peek(1);
    if (peek1 === "!") {
      resulting_string = this.__patterns.comment.read();
      if (resulting_string) {
        directives2 = directives_core.get_directives(resulting_string);
        if (directives2 && directives2.ignore === "start") {
          resulting_string += directives_core.readIgnored(this._input);
        }
      } else {
        resulting_string = this.__patterns.cdata.read();
      }
    }
    if (resulting_string) {
      token2 = this._create_token(TOKEN$1.COMMENT, resulting_string);
      token2.directives = directives2;
    }
  }
  return token2;
};
Tokenizer$1.prototype._read_processing = function(c) {
  var token2 = null;
  var resulting_string = null;
  var directives2 = null;
  if (c === "<") {
    var peek1 = this._input.peek(1);
    if (peek1 === "!" || peek1 === "?") {
      resulting_string = this.__patterns.conditional_comment.read();
      resulting_string = resulting_string || this.__patterns.processing.read();
    }
    if (resulting_string) {
      token2 = this._create_token(TOKEN$1.COMMENT, resulting_string);
      token2.directives = directives2;
    }
  }
  return token2;
};
Tokenizer$1.prototype._read_open = function(c, open_token) {
  var resulting_string = null;
  var token2 = null;
  if (!open_token || open_token.type === TOKEN$1.CONTROL_FLOW_OPEN) {
    if (c === "<") {
      resulting_string = this._input.next();
      if (this._input.peek() === "/") {
        resulting_string += this._input.next();
      }
      resulting_string += this.__patterns.element_name.read();
      token2 = this._create_token(TOKEN$1.TAG_OPEN, resulting_string);
    }
  }
  return token2;
};
Tokenizer$1.prototype._read_open_handlebars = function(c, open_token) {
  var resulting_string = null;
  var token2 = null;
  if (!open_token || open_token.type === TOKEN$1.CONTROL_FLOW_OPEN) {
    if ((this._options.templating.includes("angular") || this._options.indent_handlebars) && c === "{" && this._input.peek(1) === "{") {
      if (this._options.indent_handlebars && this._input.peek(2) === "!") {
        resulting_string = this.__patterns.handlebars_comment.read();
        resulting_string = resulting_string || this.__patterns.handlebars.read();
        token2 = this._create_token(TOKEN$1.COMMENT, resulting_string);
      } else {
        resulting_string = this.__patterns.handlebars_open.read();
        token2 = this._create_token(TOKEN$1.TAG_OPEN, resulting_string);
      }
    }
  }
  return token2;
};
Tokenizer$1.prototype._read_control_flows = function(c, open_token) {
  var resulting_string = "";
  var token2 = null;
  if (!this._options.templating.includes("angular")) {
    return token2;
  }
  if (c === "@") {
    resulting_string = this.__patterns.angular_control_flow_start.read();
    if (resulting_string === "") {
      return token2;
    }
    var opening_parentheses_count = resulting_string.endsWith("(") ? 1 : 0;
    var closing_parentheses_count = 0;
    while (!(resulting_string.endsWith("{") && opening_parentheses_count === closing_parentheses_count)) {
      var next_char = this._input.next();
      if (next_char === null) {
        break;
      } else if (next_char === "(") {
        opening_parentheses_count++;
      } else if (next_char === ")") {
        closing_parentheses_count++;
      }
      resulting_string += next_char;
    }
    token2 = this._create_token(TOKEN$1.CONTROL_FLOW_OPEN, resulting_string);
  } else if (c === "}" && open_token && open_token.type === TOKEN$1.CONTROL_FLOW_OPEN) {
    resulting_string = this._input.next();
    token2 = this._create_token(TOKEN$1.CONTROL_FLOW_CLOSE, resulting_string);
  }
  return token2;
};
Tokenizer$1.prototype._read_close = function(c, open_token) {
  var resulting_string = null;
  var token2 = null;
  if (open_token && open_token.type === TOKEN$1.TAG_OPEN) {
    if (open_token.text[0] === "<" && (c === ">" || c === "/" && this._input.peek(1) === ">")) {
      resulting_string = this._input.next();
      if (c === "/") {
        resulting_string += this._input.next();
      }
      token2 = this._create_token(TOKEN$1.TAG_CLOSE, resulting_string);
    } else if (open_token.text[0] === "{" && c === "}" && this._input.peek(1) === "}") {
      this._input.next();
      this._input.next();
      token2 = this._create_token(TOKEN$1.TAG_CLOSE, "}}");
    }
  }
  return token2;
};
Tokenizer$1.prototype._read_attribute = function(c, previous_token, open_token) {
  var token2 = null;
  var resulting_string = "";
  if (open_token && open_token.text[0] === "<") {
    if (c === "=") {
      token2 = this._create_token(TOKEN$1.EQUALS, this._input.next());
    } else if (c === '"' || c === "'") {
      var content = this._input.next();
      if (c === '"') {
        content += this.__patterns.double_quote.read();
      } else {
        content += this.__patterns.single_quote.read();
      }
      token2 = this._create_token(TOKEN$1.VALUE, content);
    } else {
      resulting_string = this.__patterns.attribute.read();
      if (resulting_string) {
        if (previous_token.type === TOKEN$1.EQUALS) {
          token2 = this._create_token(TOKEN$1.VALUE, resulting_string);
        } else {
          token2 = this._create_token(TOKEN$1.ATTRIBUTE, resulting_string);
        }
      }
    }
  }
  return token2;
};
Tokenizer$1.prototype._is_content_unformatted = function(tag_name) {
  return this._options.void_elements.indexOf(tag_name) === -1 && (this._options.content_unformatted.indexOf(tag_name) !== -1 || this._options.unformatted.indexOf(tag_name) !== -1);
};
Tokenizer$1.prototype._read_raw_content = function(c, previous_token, open_token) {
  var resulting_string = "";
  if (open_token && open_token.text[0] === "{") {
    resulting_string = this.__patterns.handlebars_raw_close.read();
  } else if (previous_token.type === TOKEN$1.TAG_CLOSE && previous_token.opened.text[0] === "<" && previous_token.text[0] !== "/") {
    var tag_name = previous_token.opened.text.substr(1).toLowerCase();
    if (this._is_content_unformatted(tag_name)) {
      resulting_string = this._input.readUntil(new RegExp("</" + tag_name + "[\\n\\r\\t ]*?>", "ig"));
    }
  }
  if (resulting_string) {
    return this._create_token(TOKEN$1.TEXT, resulting_string);
  }
  return null;
};
Tokenizer$1.prototype._read_script_and_style = function(c, previous_token) {
  if (previous_token.type === TOKEN$1.TAG_CLOSE && previous_token.opened.text[0] === "<" && previous_token.text[0] !== "/") {
    var tag_name = previous_token.opened.text.substr(1).toLowerCase();
    if (tag_name === "script" || tag_name === "style") {
      var token2 = this._read_comment_or_cdata(c);
      if (token2) {
        token2.type = TOKEN$1.TEXT;
        return token2;
      }
      var resulting_string = this._input.readUntil(new RegExp("</" + tag_name + "[\\n\\r\\t ]*?>", "ig"));
      if (resulting_string) {
        return this._create_token(TOKEN$1.TEXT, resulting_string);
      }
    }
  }
  return null;
};
Tokenizer$1.prototype._read_content_word = function(c, open_token) {
  var resulting_string = "";
  if (this._options.unformatted_content_delimiter) {
    if (c === this._options.unformatted_content_delimiter[0]) {
      resulting_string = this.__patterns.unformatted_content_delimiter.read();
    }
  }
  if (!resulting_string) {
    resulting_string = open_token && open_token.type === TOKEN$1.CONTROL_FLOW_OPEN ? this.__patterns.word_control_flow_close_excluded.read() : this.__patterns.word.read();
  }
  if (resulting_string) {
    return this._create_token(TOKEN$1.TEXT, resulting_string);
  }
  return null;
};
tokenizer.Tokenizer = Tokenizer$1;
tokenizer.TOKEN = TOKEN$1;
var Options$1 = options.Options;
var Output = output.Output;
var Tokenizer = tokenizer.Tokenizer;
var TOKEN = tokenizer.TOKEN;
var lineBreak = /\r\n|[\r\n]/;
var allLineBreaks = /\r\n|[\r\n]/g;
var Printer = function(options2, base_indent_string) {
  this.indent_level = 0;
  this.alignment_size = 0;
  this.max_preserve_newlines = options2.max_preserve_newlines;
  this.preserve_newlines = options2.preserve_newlines;
  this._output = new Output(options2, base_indent_string);
};
Printer.prototype.current_line_has_match = function(pattern2) {
  return this._output.current_line.has_match(pattern2);
};
Printer.prototype.set_space_before_token = function(value, non_breaking) {
  this._output.space_before_token = value;
  this._output.non_breaking_space = non_breaking;
};
Printer.prototype.set_wrap_point = function() {
  this._output.set_indent(this.indent_level, this.alignment_size);
  this._output.set_wrap_point();
};
Printer.prototype.add_raw_token = function(token2) {
  this._output.add_raw_token(token2);
};
Printer.prototype.print_preserved_newlines = function(raw_token) {
  var newlines = 0;
  if (raw_token.type !== TOKEN.TEXT && raw_token.previous.type !== TOKEN.TEXT) {
    newlines = raw_token.newlines ? 1 : 0;
  }
  if (this.preserve_newlines) {
    newlines = raw_token.newlines < this.max_preserve_newlines + 1 ? raw_token.newlines : this.max_preserve_newlines + 1;
  }
  for (var n = 0; n < newlines; n++) {
    this.print_newline(n > 0);
  }
  return newlines !== 0;
};
Printer.prototype.traverse_whitespace = function(raw_token) {
  if (raw_token.whitespace_before || raw_token.newlines) {
    if (!this.print_preserved_newlines(raw_token)) {
      this._output.space_before_token = true;
    }
    return true;
  }
  return false;
};
Printer.prototype.previous_token_wrapped = function() {
  return this._output.previous_token_wrapped;
};
Printer.prototype.print_newline = function(force) {
  this._output.add_new_line(force);
};
Printer.prototype.print_token = function(token2) {
  if (token2.text) {
    this._output.set_indent(this.indent_level, this.alignment_size);
    this._output.add_token(token2.text);
  }
};
Printer.prototype.indent = function() {
  this.indent_level++;
};
Printer.prototype.deindent = function() {
  if (this.indent_level > 0) {
    this.indent_level--;
    this._output.set_indent(this.indent_level, this.alignment_size);
  }
};
Printer.prototype.get_full_indent = function(level) {
  level = this.indent_level + (level || 0);
  if (level < 1) {
    return "";
  }
  return this._output.get_indent_string(level);
};
var get_type_attribute = function(start_token) {
  var result = null;
  var raw_token = start_token.next;
  while (raw_token.type !== TOKEN.EOF && start_token.closed !== raw_token) {
    if (raw_token.type === TOKEN.ATTRIBUTE && raw_token.text === "type") {
      if (raw_token.next && raw_token.next.type === TOKEN.EQUALS && raw_token.next.next && raw_token.next.next.type === TOKEN.VALUE) {
        result = raw_token.next.next.text;
      }
      break;
    }
    raw_token = raw_token.next;
  }
  return result;
};
var get_custom_beautifier_name = function(tag_check, raw_token) {
  var typeAttribute = null;
  var result = null;
  if (!raw_token.closed) {
    return null;
  }
  if (tag_check === "script") {
    typeAttribute = "text/javascript";
  } else if (tag_check === "style") {
    typeAttribute = "text/css";
  }
  typeAttribute = get_type_attribute(raw_token) || typeAttribute;
  if (typeAttribute.search("text/css") > -1) {
    result = "css";
  } else if (typeAttribute.search(/module|((text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect))/) > -1) {
    result = "javascript";
  } else if (typeAttribute.search(/(text|application|dojo)\/(x-)?(html)/) > -1) {
    result = "html";
  } else if (typeAttribute.search(/test\/null/) > -1) {
    result = "null";
  }
  return result;
};
function in_array(what, arr) {
  return arr.indexOf(what) !== -1;
}
function TagFrame(parent, parser_token, indent_level) {
  this.parent = parent || null;
  this.tag = parser_token ? parser_token.tag_name : "";
  this.indent_level = indent_level || 0;
  this.parser_token = parser_token || null;
}
function TagStack(printer) {
  this._printer = printer;
  this._current_frame = null;
}
TagStack.prototype.get_parser_token = function() {
  return this._current_frame ? this._current_frame.parser_token : null;
};
TagStack.prototype.record_tag = function(parser_token) {
  var new_frame = new TagFrame(this._current_frame, parser_token, this._printer.indent_level);
  this._current_frame = new_frame;
};
TagStack.prototype._try_pop_frame = function(frame) {
  var parser_token = null;
  if (frame) {
    parser_token = frame.parser_token;
    this._printer.indent_level = frame.indent_level;
    this._current_frame = frame.parent;
  }
  return parser_token;
};
TagStack.prototype._get_frame = function(tag_list, stop_list) {
  var frame = this._current_frame;
  while (frame) {
    if (tag_list.indexOf(frame.tag) !== -1) {
      break;
    } else if (stop_list && stop_list.indexOf(frame.tag) !== -1) {
      frame = null;
      break;
    }
    frame = frame.parent;
  }
  return frame;
};
TagStack.prototype.try_pop = function(tag, stop_list) {
  var frame = this._get_frame([tag], stop_list);
  return this._try_pop_frame(frame);
};
TagStack.prototype.indent_to_tag = function(tag_list) {
  var frame = this._get_frame(tag_list);
  if (frame) {
    this._printer.indent_level = frame.indent_level;
  }
};
function Beautifier$1(source_text, options2, js_beautify2, css_beautify2) {
  this._source_text = source_text || "";
  options2 = options2 || {};
  this._js_beautify = js_beautify2;
  this._css_beautify = css_beautify2;
  this._tag_stack = null;
  var optionHtml = new Options$1(options2, "html");
  this._options = optionHtml;
  this._is_wrap_attributes_force = this._options.wrap_attributes.substr(0, "force".length) === "force";
  this._is_wrap_attributes_force_expand_multiline = this._options.wrap_attributes === "force-expand-multiline";
  this._is_wrap_attributes_force_aligned = this._options.wrap_attributes === "force-aligned";
  this._is_wrap_attributes_aligned_multiple = this._options.wrap_attributes === "aligned-multiple";
  this._is_wrap_attributes_preserve = this._options.wrap_attributes.substr(0, "preserve".length) === "preserve";
  this._is_wrap_attributes_preserve_aligned = this._options.wrap_attributes === "preserve-aligned";
}
Beautifier$1.prototype.beautify = function() {
  if (this._options.disabled) {
    return this._source_text;
  }
  var source_text = this._source_text;
  var eol = this._options.eol;
  if (this._options.eol === "auto") {
    eol = "\n";
    if (source_text && lineBreak.test(source_text)) {
      eol = source_text.match(lineBreak)[0];
    }
  }
  source_text = source_text.replace(allLineBreaks, "\n");
  var baseIndentString = source_text.match(/^[\t ]*/)[0];
  var last_token = {
    text: "",
    type: ""
  };
  var last_tag_token = new TagOpenParserToken(this._options);
  var printer = new Printer(this._options, baseIndentString);
  var tokens = new Tokenizer(source_text, this._options).tokenize();
  this._tag_stack = new TagStack(printer);
  var parser_token = null;
  var raw_token = tokens.next();
  while (raw_token.type !== TOKEN.EOF) {
    if (raw_token.type === TOKEN.TAG_OPEN || raw_token.type === TOKEN.COMMENT) {
      parser_token = this._handle_tag_open(printer, raw_token, last_tag_token, last_token, tokens);
      last_tag_token = parser_token;
    } else if (raw_token.type === TOKEN.ATTRIBUTE || raw_token.type === TOKEN.EQUALS || raw_token.type === TOKEN.VALUE || raw_token.type === TOKEN.TEXT && !last_tag_token.tag_complete) {
      parser_token = this._handle_inside_tag(printer, raw_token, last_tag_token, last_token);
    } else if (raw_token.type === TOKEN.TAG_CLOSE) {
      parser_token = this._handle_tag_close(printer, raw_token, last_tag_token);
    } else if (raw_token.type === TOKEN.TEXT) {
      parser_token = this._handle_text(printer, raw_token, last_tag_token);
    } else if (raw_token.type === TOKEN.CONTROL_FLOW_OPEN) {
      parser_token = this._handle_control_flow_open(printer, raw_token);
    } else if (raw_token.type === TOKEN.CONTROL_FLOW_CLOSE) {
      parser_token = this._handle_control_flow_close(printer, raw_token);
    } else {
      printer.add_raw_token(raw_token);
    }
    last_token = parser_token;
    raw_token = tokens.next();
  }
  var sweet_code = printer._output.get_code(eol);
  return sweet_code;
};
Beautifier$1.prototype._handle_control_flow_open = function(printer, raw_token) {
  var parser_token = {
    text: raw_token.text,
    type: raw_token.type
  };
  printer.set_space_before_token(raw_token.newlines || raw_token.whitespace_before !== "", true);
  if (raw_token.newlines) {
    printer.print_preserved_newlines(raw_token);
  } else {
    printer.set_space_before_token(raw_token.newlines || raw_token.whitespace_before !== "", true);
  }
  printer.print_token(raw_token);
  printer.indent();
  return parser_token;
};
Beautifier$1.prototype._handle_control_flow_close = function(printer, raw_token) {
  var parser_token = {
    text: raw_token.text,
    type: raw_token.type
  };
  printer.deindent();
  if (raw_token.newlines) {
    printer.print_preserved_newlines(raw_token);
  } else {
    printer.set_space_before_token(raw_token.newlines || raw_token.whitespace_before !== "", true);
  }
  printer.print_token(raw_token);
  return parser_token;
};
Beautifier$1.prototype._handle_tag_close = function(printer, raw_token, last_tag_token) {
  var parser_token = {
    text: raw_token.text,
    type: raw_token.type
  };
  printer.alignment_size = 0;
  last_tag_token.tag_complete = true;
  printer.set_space_before_token(raw_token.newlines || raw_token.whitespace_before !== "", true);
  if (last_tag_token.is_unformatted) {
    printer.add_raw_token(raw_token);
  } else {
    if (last_tag_token.tag_start_char === "<") {
      printer.set_space_before_token(raw_token.text[0] === "/", true);
      if (this._is_wrap_attributes_force_expand_multiline && last_tag_token.has_wrapped_attrs) {
        printer.print_newline(false);
      }
    }
    printer.print_token(raw_token);
  }
  if (last_tag_token.indent_content && !(last_tag_token.is_unformatted || last_tag_token.is_content_unformatted)) {
    printer.indent();
    last_tag_token.indent_content = false;
  }
  if (!last_tag_token.is_inline_element && !(last_tag_token.is_unformatted || last_tag_token.is_content_unformatted)) {
    printer.set_wrap_point();
  }
  return parser_token;
};
Beautifier$1.prototype._handle_inside_tag = function(printer, raw_token, last_tag_token, last_token) {
  var wrapped = last_tag_token.has_wrapped_attrs;
  var parser_token = {
    text: raw_token.text,
    type: raw_token.type
  };
  printer.set_space_before_token(raw_token.newlines || raw_token.whitespace_before !== "", true);
  if (last_tag_token.is_unformatted) {
    printer.add_raw_token(raw_token);
  } else if (last_tag_token.tag_start_char === "{" && raw_token.type === TOKEN.TEXT) {
    if (printer.print_preserved_newlines(raw_token)) {
      raw_token.newlines = 0;
      printer.add_raw_token(raw_token);
    } else {
      printer.print_token(raw_token);
    }
  } else {
    if (raw_token.type === TOKEN.ATTRIBUTE) {
      printer.set_space_before_token(true);
    } else if (raw_token.type === TOKEN.EQUALS) {
      printer.set_space_before_token(false);
    } else if (raw_token.type === TOKEN.VALUE && raw_token.previous.type === TOKEN.EQUALS) {
      printer.set_space_before_token(false);
    }
    if (raw_token.type === TOKEN.ATTRIBUTE && last_tag_token.tag_start_char === "<") {
      if (this._is_wrap_attributes_preserve || this._is_wrap_attributes_preserve_aligned) {
        printer.traverse_whitespace(raw_token);
        wrapped = wrapped || raw_token.newlines !== 0;
      }
      if (this._is_wrap_attributes_force && last_tag_token.attr_count >= this._options.wrap_attributes_min_attrs && (last_token.type !== TOKEN.TAG_OPEN || this._is_wrap_attributes_force_expand_multiline)) {
        printer.print_newline(false);
        wrapped = true;
      }
    }
    printer.print_token(raw_token);
    wrapped = wrapped || printer.previous_token_wrapped();
    last_tag_token.has_wrapped_attrs = wrapped;
  }
  return parser_token;
};
Beautifier$1.prototype._handle_text = function(printer, raw_token, last_tag_token) {
  var parser_token = {
    text: raw_token.text,
    type: "TK_CONTENT"
  };
  if (last_tag_token.custom_beautifier_name) {
    this._print_custom_beatifier_text(printer, raw_token, last_tag_token);
  } else if (last_tag_token.is_unformatted || last_tag_token.is_content_unformatted) {
    printer.add_raw_token(raw_token);
  } else {
    printer.traverse_whitespace(raw_token);
    printer.print_token(raw_token);
  }
  return parser_token;
};
Beautifier$1.prototype._print_custom_beatifier_text = function(printer, raw_token, last_tag_token) {
  var local = this;
  if (raw_token.text !== "") {
    var text = raw_token.text, _beautifier, script_indent_level = 1, pre = "", post = "";
    if (last_tag_token.custom_beautifier_name === "javascript" && typeof this._js_beautify === "function") {
      _beautifier = this._js_beautify;
    } else if (last_tag_token.custom_beautifier_name === "css" && typeof this._css_beautify === "function") {
      _beautifier = this._css_beautify;
    } else if (last_tag_token.custom_beautifier_name === "html") {
      _beautifier = function(html_source, options2) {
        var beautifier2 = new Beautifier$1(html_source, options2, local._js_beautify, local._css_beautify);
        return beautifier2.beautify();
      };
    }
    if (this._options.indent_scripts === "keep") {
      script_indent_level = 0;
    } else if (this._options.indent_scripts === "separate") {
      script_indent_level = -printer.indent_level;
    }
    var indentation = printer.get_full_indent(script_indent_level);
    text = text.replace(/\n[ \t]*$/, "");
    if (last_tag_token.custom_beautifier_name !== "html" && text[0] === "<" && text.match(/^(<!--|<!\[CDATA\[)/)) {
      var matched = /^(<!--[^\n]*|<!\[CDATA\[)(\n?)([ \t\n]*)([\s\S]*)(-->|]]>)$/.exec(text);
      if (!matched) {
        printer.add_raw_token(raw_token);
        return;
      }
      pre = indentation + matched[1] + "\n";
      text = matched[4];
      if (matched[5]) {
        post = indentation + matched[5];
      }
      text = text.replace(/\n[ \t]*$/, "");
      if (matched[2] || matched[3].indexOf("\n") !== -1) {
        matched = matched[3].match(/[ \t]+$/);
        if (matched) {
          raw_token.whitespace_before = matched[0];
        }
      }
    }
    if (text) {
      if (_beautifier) {
        var Child_options = function() {
          this.eol = "\n";
        };
        Child_options.prototype = this._options.raw_options;
        var child_options = new Child_options();
        text = _beautifier(indentation + text, child_options);
      } else {
        var white = raw_token.whitespace_before;
        if (white) {
          text = text.replace(new RegExp("\n(" + white + ")?", "g"), "\n");
        }
        text = indentation + text.replace(/\n/g, "\n" + indentation);
      }
    }
    if (pre) {
      if (!text) {
        text = pre + post;
      } else {
        text = pre + text + "\n" + post;
      }
    }
    printer.print_newline(false);
    if (text) {
      raw_token.text = text;
      raw_token.whitespace_before = "";
      raw_token.newlines = 0;
      printer.add_raw_token(raw_token);
      printer.print_newline(true);
    }
  }
};
Beautifier$1.prototype._handle_tag_open = function(printer, raw_token, last_tag_token, last_token, tokens) {
  var parser_token = this._get_tag_open_token(raw_token);
  if ((last_tag_token.is_unformatted || last_tag_token.is_content_unformatted) && !last_tag_token.is_empty_element && raw_token.type === TOKEN.TAG_OPEN && !parser_token.is_start_tag) {
    printer.add_raw_token(raw_token);
    parser_token.start_tag_token = this._tag_stack.try_pop(parser_token.tag_name);
  } else {
    printer.traverse_whitespace(raw_token);
    this._set_tag_position(printer, raw_token, parser_token, last_tag_token, last_token);
    if (!parser_token.is_inline_element) {
      printer.set_wrap_point();
    }
    printer.print_token(raw_token);
  }
  if (parser_token.is_start_tag && this._is_wrap_attributes_force) {
    var peek_index = 0;
    var peek_token;
    do {
      peek_token = tokens.peek(peek_index);
      if (peek_token.type === TOKEN.ATTRIBUTE) {
        parser_token.attr_count += 1;
      }
      peek_index += 1;
    } while (peek_token.type !== TOKEN.EOF && peek_token.type !== TOKEN.TAG_CLOSE);
  }
  if (this._is_wrap_attributes_force_aligned || this._is_wrap_attributes_aligned_multiple || this._is_wrap_attributes_preserve_aligned) {
    parser_token.alignment_size = raw_token.text.length + 1;
  }
  if (!parser_token.tag_complete && !parser_token.is_unformatted) {
    printer.alignment_size = parser_token.alignment_size;
  }
  return parser_token;
};
var TagOpenParserToken = function(options2, parent, raw_token) {
  this.parent = parent || null;
  this.text = "";
  this.type = "TK_TAG_OPEN";
  this.tag_name = "";
  this.is_inline_element = false;
  this.is_unformatted = false;
  this.is_content_unformatted = false;
  this.is_empty_element = false;
  this.is_start_tag = false;
  this.is_end_tag = false;
  this.indent_content = false;
  this.multiline_content = false;
  this.custom_beautifier_name = null;
  this.start_tag_token = null;
  this.attr_count = 0;
  this.has_wrapped_attrs = false;
  this.alignment_size = 0;
  this.tag_complete = false;
  this.tag_start_char = "";
  this.tag_check = "";
  if (!raw_token) {
    this.tag_complete = true;
  } else {
    var tag_check_match;
    this.tag_start_char = raw_token.text[0];
    this.text = raw_token.text;
    if (this.tag_start_char === "<") {
      tag_check_match = raw_token.text.match(/^<([^\s>]*)/);
      this.tag_check = tag_check_match ? tag_check_match[1] : "";
    } else {
      tag_check_match = raw_token.text.match(/^{{~?(?:[\^]|#\*?)?([^\s}]+)/);
      this.tag_check = tag_check_match ? tag_check_match[1] : "";
      if ((raw_token.text.startsWith("{{#>") || raw_token.text.startsWith("{{~#>")) && this.tag_check[0] === ">") {
        if (this.tag_check === ">" && raw_token.next !== null) {
          this.tag_check = raw_token.next.text.split(" ")[0];
        } else {
          this.tag_check = raw_token.text.split(">")[1];
        }
      }
    }
    this.tag_check = this.tag_check.toLowerCase();
    if (raw_token.type === TOKEN.COMMENT) {
      this.tag_complete = true;
    }
    this.is_start_tag = this.tag_check.charAt(0) !== "/";
    this.tag_name = !this.is_start_tag ? this.tag_check.substr(1) : this.tag_check;
    this.is_end_tag = !this.is_start_tag || raw_token.closed && raw_token.closed.text === "/>";
    var handlebar_starts = 2;
    if (this.tag_start_char === "{" && this.text.length >= 3) {
      if (this.text.charAt(2) === "~") {
        handlebar_starts = 3;
      }
    }
    this.is_end_tag = this.is_end_tag || this.tag_start_char === "{" && (!options2.indent_handlebars || this.text.length < 3 || /[^#\^]/.test(this.text.charAt(handlebar_starts)));
  }
};
Beautifier$1.prototype._get_tag_open_token = function(raw_token) {
  var parser_token = new TagOpenParserToken(this._options, this._tag_stack.get_parser_token(), raw_token);
  parser_token.alignment_size = this._options.wrap_attributes_indent_size;
  parser_token.is_end_tag = parser_token.is_end_tag || in_array(parser_token.tag_check, this._options.void_elements);
  parser_token.is_empty_element = parser_token.tag_complete || parser_token.is_start_tag && parser_token.is_end_tag;
  parser_token.is_unformatted = !parser_token.tag_complete && in_array(parser_token.tag_check, this._options.unformatted);
  parser_token.is_content_unformatted = !parser_token.is_empty_element && in_array(parser_token.tag_check, this._options.content_unformatted);
  parser_token.is_inline_element = in_array(parser_token.tag_name, this._options.inline) || this._options.inline_custom_elements && parser_token.tag_name.includes("-") || parser_token.tag_start_char === "{";
  return parser_token;
};
Beautifier$1.prototype._set_tag_position = function(printer, raw_token, parser_token, last_tag_token, last_token) {
  if (!parser_token.is_empty_element) {
    if (parser_token.is_end_tag) {
      parser_token.start_tag_token = this._tag_stack.try_pop(parser_token.tag_name);
    } else {
      if (this._do_optional_end_element(parser_token)) {
        if (!parser_token.is_inline_element) {
          printer.print_newline(false);
        }
      }
      this._tag_stack.record_tag(parser_token);
      if ((parser_token.tag_name === "script" || parser_token.tag_name === "style") && !(parser_token.is_unformatted || parser_token.is_content_unformatted)) {
        parser_token.custom_beautifier_name = get_custom_beautifier_name(parser_token.tag_check, raw_token);
      }
    }
  }
  if (in_array(parser_token.tag_check, this._options.extra_liners)) {
    printer.print_newline(false);
    if (!printer._output.just_added_blankline()) {
      printer.print_newline(true);
    }
  }
  if (parser_token.is_empty_element) {
    if (parser_token.tag_start_char === "{" && parser_token.tag_check === "else") {
      this._tag_stack.indent_to_tag(["if", "unless", "each"]);
      parser_token.indent_content = true;
      var foundIfOnCurrentLine = printer.current_line_has_match(/{{#if/);
      if (!foundIfOnCurrentLine) {
        printer.print_newline(false);
      }
    }
    if (parser_token.tag_name === "!--" && last_token.type === TOKEN.TAG_CLOSE && last_tag_token.is_end_tag && parser_token.text.indexOf("\n") === -1)
      ;
    else {
      if (!(parser_token.is_inline_element || parser_token.is_unformatted)) {
        printer.print_newline(false);
      }
      this._calcluate_parent_multiline(printer, parser_token);
    }
  } else if (parser_token.is_end_tag) {
    var do_end_expand = false;
    do_end_expand = parser_token.start_tag_token && parser_token.start_tag_token.multiline_content;
    do_end_expand = do_end_expand || !parser_token.is_inline_element && !(last_tag_token.is_inline_element || last_tag_token.is_unformatted) && !(last_token.type === TOKEN.TAG_CLOSE && parser_token.start_tag_token === last_tag_token) && last_token.type !== "TK_CONTENT";
    if (parser_token.is_content_unformatted || parser_token.is_unformatted) {
      do_end_expand = false;
    }
    if (do_end_expand) {
      printer.print_newline(false);
    }
  } else {
    parser_token.indent_content = !parser_token.custom_beautifier_name;
    if (parser_token.tag_start_char === "<") {
      if (parser_token.tag_name === "html") {
        parser_token.indent_content = this._options.indent_inner_html;
      } else if (parser_token.tag_name === "head") {
        parser_token.indent_content = this._options.indent_head_inner_html;
      } else if (parser_token.tag_name === "body") {
        parser_token.indent_content = this._options.indent_body_inner_html;
      }
    }
    if (!(parser_token.is_inline_element || parser_token.is_unformatted) && (last_token.type !== "TK_CONTENT" || parser_token.is_content_unformatted)) {
      printer.print_newline(false);
    }
    this._calcluate_parent_multiline(printer, parser_token);
  }
};
Beautifier$1.prototype._calcluate_parent_multiline = function(printer, parser_token) {
  if (parser_token.parent && printer._output.just_added_newline() && !((parser_token.is_inline_element || parser_token.is_unformatted) && parser_token.parent.is_inline_element)) {
    parser_token.parent.multiline_content = true;
  }
};
var p_closers = ["address", "article", "aside", "blockquote", "details", "div", "dl", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hr", "main", "menu", "nav", "ol", "p", "pre", "section", "table", "ul"];
var p_parent_excludes = ["a", "audio", "del", "ins", "map", "noscript", "video"];
Beautifier$1.prototype._do_optional_end_element = function(parser_token) {
  var result = null;
  if (parser_token.is_empty_element || !parser_token.is_start_tag || !parser_token.parent) {
    return;
  }
  if (parser_token.tag_name === "body") {
    result = result || this._tag_stack.try_pop("head");
  } else if (parser_token.tag_name === "li") {
    result = result || this._tag_stack.try_pop("li", ["ol", "ul", "menu"]);
  } else if (parser_token.tag_name === "dd" || parser_token.tag_name === "dt") {
    result = result || this._tag_stack.try_pop("dt", ["dl"]);
    result = result || this._tag_stack.try_pop("dd", ["dl"]);
  } else if (parser_token.parent.tag_name === "p" && p_closers.indexOf(parser_token.tag_name) !== -1) {
    var p_parent = parser_token.parent.parent;
    if (!p_parent || p_parent_excludes.indexOf(p_parent.tag_name) === -1) {
      result = result || this._tag_stack.try_pop("p");
    }
  } else if (parser_token.tag_name === "rp" || parser_token.tag_name === "rt") {
    result = result || this._tag_stack.try_pop("rt", ["ruby", "rtc"]);
    result = result || this._tag_stack.try_pop("rp", ["ruby", "rtc"]);
  } else if (parser_token.tag_name === "optgroup") {
    result = result || this._tag_stack.try_pop("optgroup", ["select"]);
  } else if (parser_token.tag_name === "option") {
    result = result || this._tag_stack.try_pop("option", ["select", "datalist", "optgroup"]);
  } else if (parser_token.tag_name === "colgroup") {
    result = result || this._tag_stack.try_pop("caption", ["table"]);
  } else if (parser_token.tag_name === "thead") {
    result = result || this._tag_stack.try_pop("caption", ["table"]);
    result = result || this._tag_stack.try_pop("colgroup", ["table"]);
  } else if (parser_token.tag_name === "tbody" || parser_token.tag_name === "tfoot") {
    result = result || this._tag_stack.try_pop("caption", ["table"]);
    result = result || this._tag_stack.try_pop("colgroup", ["table"]);
    result = result || this._tag_stack.try_pop("thead", ["table"]);
    result = result || this._tag_stack.try_pop("tbody", ["table"]);
  } else if (parser_token.tag_name === "tr") {
    result = result || this._tag_stack.try_pop("caption", ["table"]);
    result = result || this._tag_stack.try_pop("colgroup", ["table"]);
    result = result || this._tag_stack.try_pop("tr", ["table", "thead", "tbody", "tfoot"]);
  } else if (parser_token.tag_name === "th" || parser_token.tag_name === "td") {
    result = result || this._tag_stack.try_pop("td", ["table", "thead", "tbody", "tfoot", "tr"]);
    result = result || this._tag_stack.try_pop("th", ["table", "thead", "tbody", "tfoot", "tr"]);
  }
  parser_token.parent = this._tag_stack.get_parser_token();
  return result;
};
beautifier.Beautifier = Beautifier$1;
var Beautifier = beautifier.Beautifier, Options = options.Options;
function style_html$1(html_source, options2, js_beautify2, css_beautify2) {
  var beautifier2 = new Beautifier(html_source, options2, js_beautify2, css_beautify2);
  return beautifier2.beautify();
}
html.exports = style_html$1;
html.exports.defaultOptions = function() {
  return new Options();
};
var js_beautify = javascript.exports;
var css_beautify = css.exports;
var html_beautify = html.exports;
function style_html(html_source, options2, js2, css2) {
  js2 = js2 || js_beautify;
  css2 = css2 || css_beautify;
  return html_beautify(html_source, options2, js2, css2);
}
style_html.defaultOptions = html_beautify.defaultOptions;
src.js = js_beautify;
src.css = css_beautify;
src.html = style_html;
(function(module) {
  function get_beautify(js_beautify2, css_beautify2, html_beautify2) {
    var beautify = function(src2, config) {
      return js_beautify2.js_beautify(src2, config);
    };
    beautify.js = js_beautify2.js_beautify;
    beautify.css = css_beautify2.css_beautify;
    beautify.html = html_beautify2.html_beautify;
    beautify.js_beautify = js_beautify2.js_beautify;
    beautify.css_beautify = css_beautify2.css_beautify;
    beautify.html_beautify = html_beautify2.html_beautify;
    return beautify;
  }
  {
    (function(mod) {
      var beautifier2 = src;
      beautifier2.js_beautify = beautifier2.js;
      beautifier2.css_beautify = beautifier2.css;
      beautifier2.html_beautify = beautifier2.html;
      mod.exports = get_beautify(beautifier2, beautifier2, beautifier2);
    })(module);
  }
})(js);
var he = { exports: {} };
/*! https://mths.be/he v1.2.0 by @mathias | MIT license */
(function(module, exports) {
  (function(root) {
    var freeExports = exports;
    var freeModule = module && module.exports == freeExports && module;
    var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal;
    if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
      root = freeGlobal;
    }
    var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    var regexAsciiWhitelist = /[\x01-\x7F]/g;
    var regexBmpWhitelist = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g;
    var regexEncodeNonAscii = /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g;
    var encodeMap = { "\xAD": "shy", "\u200C": "zwnj", "\u200D": "zwj", "\u200E": "lrm", "\u2063": "ic", "\u2062": "it", "\u2061": "af", "\u200F": "rlm", "\u200B": "ZeroWidthSpace", "\u2060": "NoBreak", "\u0311": "DownBreve", "\u20DB": "tdot", "\u20DC": "DotDot", "	": "Tab", "\n": "NewLine", "\u2008": "puncsp", "\u205F": "MediumSpace", "\u2009": "thinsp", "\u200A": "hairsp", "\u2004": "emsp13", "\u2002": "ensp", "\u2005": "emsp14", "\u2003": "emsp", "\u2007": "numsp", "\xA0": "nbsp", "\u205F\u200A": "ThickSpace", "\u203E": "oline", "_": "lowbar", "\u2010": "dash", "\u2013": "ndash", "\u2014": "mdash", "\u2015": "horbar", ",": "comma", ";": "semi", "\u204F": "bsemi", ":": "colon", "\u2A74": "Colone", "!": "excl", "\xA1": "iexcl", "?": "quest", "\xBF": "iquest", ".": "period", "\u2025": "nldr", "\u2026": "mldr", "\xB7": "middot", "'": "apos", "\u2018": "lsquo", "\u2019": "rsquo", "\u201A": "sbquo", "\u2039": "lsaquo", "\u203A": "rsaquo", '"': "quot", "\u201C": "ldquo", "\u201D": "rdquo", "\u201E": "bdquo", "\xAB": "laquo", "\xBB": "raquo", "(": "lpar", ")": "rpar", "[": "lsqb", "]": "rsqb", "{": "lcub", "}": "rcub", "\u2308": "lceil", "\u2309": "rceil", "\u230A": "lfloor", "\u230B": "rfloor", "\u2985": "lopar", "\u2986": "ropar", "\u298B": "lbrke", "\u298C": "rbrke", "\u298D": "lbrkslu", "\u298E": "rbrksld", "\u298F": "lbrksld", "\u2990": "rbrkslu", "\u2991": "langd", "\u2992": "rangd", "\u2993": "lparlt", "\u2994": "rpargt", "\u2995": "gtlPar", "\u2996": "ltrPar", "\u27E6": "lobrk", "\u27E7": "robrk", "\u27E8": "lang", "\u27E9": "rang", "\u27EA": "Lang", "\u27EB": "Rang", "\u27EC": "loang", "\u27ED": "roang", "\u2772": "lbbrk", "\u2773": "rbbrk", "\u2016": "Vert", "\xA7": "sect", "\xB6": "para", "@": "commat", "*": "ast", "/": "sol", "undefined": null, "&": "amp", "#": "num", "%": "percnt", "\u2030": "permil", "\u2031": "pertenk", "\u2020": "dagger", "\u2021": "Dagger", "\u2022": "bull", "\u2043": "hybull", "\u2032": "prime", "\u2033": "Prime", "\u2034": "tprime", "\u2057": "qprime", "\u2035": "bprime", "\u2041": "caret", "`": "grave", "\xB4": "acute", "\u02DC": "tilde", "^": "Hat", "\xAF": "macr", "\u02D8": "breve", "\u02D9": "dot", "\xA8": "die", "\u02DA": "ring", "\u02DD": "dblac", "\xB8": "cedil", "\u02DB": "ogon", "\u02C6": "circ", "\u02C7": "caron", "\xB0": "deg", "\xA9": "copy", "\xAE": "reg", "\u2117": "copysr", "\u2118": "wp", "\u211E": "rx", "\u2127": "mho", "\u2129": "iiota", "\u2190": "larr", "\u219A": "nlarr", "\u2192": "rarr", "\u219B": "nrarr", "\u2191": "uarr", "\u2193": "darr", "\u2194": "harr", "\u21AE": "nharr", "\u2195": "varr", "\u2196": "nwarr", "\u2197": "nearr", "\u2198": "searr", "\u2199": "swarr", "\u219D": "rarrw", "\u219D\u0338": "nrarrw", "\u219E": "Larr", "\u219F": "Uarr", "\u21A0": "Rarr", "\u21A1": "Darr", "\u21A2": "larrtl", "\u21A3": "rarrtl", "\u21A4": "mapstoleft", "\u21A5": "mapstoup", "\u21A6": "map", "\u21A7": "mapstodown", "\u21A9": "larrhk", "\u21AA": "rarrhk", "\u21AB": "larrlp", "\u21AC": "rarrlp", "\u21AD": "harrw", "\u21B0": "lsh", "\u21B1": "rsh", "\u21B2": "ldsh", "\u21B3": "rdsh", "\u21B5": "crarr", "\u21B6": "cularr", "\u21B7": "curarr", "\u21BA": "olarr", "\u21BB": "orarr", "\u21BC": "lharu", "\u21BD": "lhard", "\u21BE": "uharr", "\u21BF": "uharl", "\u21C0": "rharu", "\u21C1": "rhard", "\u21C2": "dharr", "\u21C3": "dharl", "\u21C4": "rlarr", "\u21C5": "udarr", "\u21C6": "lrarr", "\u21C7": "llarr", "\u21C8": "uuarr", "\u21C9": "rrarr", "\u21CA": "ddarr", "\u21CB": "lrhar", "\u21CC": "rlhar", "\u21D0": "lArr", "\u21CD": "nlArr", "\u21D1": "uArr", "\u21D2": "rArr", "\u21CF": "nrArr", "\u21D3": "dArr", "\u21D4": "iff", "\u21CE": "nhArr", "\u21D5": "vArr", "\u21D6": "nwArr", "\u21D7": "neArr", "\u21D8": "seArr", "\u21D9": "swArr", "\u21DA": "lAarr", "\u21DB": "rAarr", "\u21DD": "zigrarr", "\u21E4": "larrb", "\u21E5": "rarrb", "\u21F5": "duarr", "\u21FD": "loarr", "\u21FE": "roarr", "\u21FF": "hoarr", "\u2200": "forall", "\u2201": "comp", "\u2202": "part", "\u2202\u0338": "npart", "\u2203": "exist", "\u2204": "nexist", "\u2205": "empty", "\u2207": "Del", "\u2208": "in", "\u2209": "notin", "\u220B": "ni", "\u220C": "notni", "\u03F6": "bepsi", "\u220F": "prod", "\u2210": "coprod", "\u2211": "sum", "+": "plus", "\xB1": "pm", "\xF7": "div", "\xD7": "times", "<": "lt", "\u226E": "nlt", "<\u20D2": "nvlt", "=": "equals", "\u2260": "ne", "=\u20E5": "bne", "\u2A75": "Equal", ">": "gt", "\u226F": "ngt", ">\u20D2": "nvgt", "\xAC": "not", "|": "vert", "\xA6": "brvbar", "\u2212": "minus", "\u2213": "mp", "\u2214": "plusdo", "\u2044": "frasl", "\u2216": "setmn", "\u2217": "lowast", "\u2218": "compfn", "\u221A": "Sqrt", "\u221D": "prop", "\u221E": "infin", "\u221F": "angrt", "\u2220": "ang", "\u2220\u20D2": "nang", "\u2221": "angmsd", "\u2222": "angsph", "\u2223": "mid", "\u2224": "nmid", "\u2225": "par", "\u2226": "npar", "\u2227": "and", "\u2228": "or", "\u2229": "cap", "\u2229\uFE00": "caps", "\u222A": "cup", "\u222A\uFE00": "cups", "\u222B": "int", "\u222C": "Int", "\u222D": "tint", "\u2A0C": "qint", "\u222E": "oint", "\u222F": "Conint", "\u2230": "Cconint", "\u2231": "cwint", "\u2232": "cwconint", "\u2233": "awconint", "\u2234": "there4", "\u2235": "becaus", "\u2236": "ratio", "\u2237": "Colon", "\u2238": "minusd", "\u223A": "mDDot", "\u223B": "homtht", "\u223C": "sim", "\u2241": "nsim", "\u223C\u20D2": "nvsim", "\u223D": "bsim", "\u223D\u0331": "race", "\u223E": "ac", "\u223E\u0333": "acE", "\u223F": "acd", "\u2240": "wr", "\u2242": "esim", "\u2242\u0338": "nesim", "\u2243": "sime", "\u2244": "nsime", "\u2245": "cong", "\u2247": "ncong", "\u2246": "simne", "\u2248": "ap", "\u2249": "nap", "\u224A": "ape", "\u224B": "apid", "\u224B\u0338": "napid", "\u224C": "bcong", "\u224D": "CupCap", "\u226D": "NotCupCap", "\u224D\u20D2": "nvap", "\u224E": "bump", "\u224E\u0338": "nbump", "\u224F": "bumpe", "\u224F\u0338": "nbumpe", "\u2250": "doteq", "\u2250\u0338": "nedot", "\u2251": "eDot", "\u2252": "efDot", "\u2253": "erDot", "\u2254": "colone", "\u2255": "ecolon", "\u2256": "ecir", "\u2257": "cire", "\u2259": "wedgeq", "\u225A": "veeeq", "\u225C": "trie", "\u225F": "equest", "\u2261": "equiv", "\u2262": "nequiv", "\u2261\u20E5": "bnequiv", "\u2264": "le", "\u2270": "nle", "\u2264\u20D2": "nvle", "\u2265": "ge", "\u2271": "nge", "\u2265\u20D2": "nvge", "\u2266": "lE", "\u2266\u0338": "nlE", "\u2267": "gE", "\u2267\u0338": "ngE", "\u2268\uFE00": "lvnE", "\u2268": "lnE", "\u2269": "gnE", "\u2269\uFE00": "gvnE", "\u226A": "ll", "\u226A\u0338": "nLtv", "\u226A\u20D2": "nLt", "\u226B": "gg", "\u226B\u0338": "nGtv", "\u226B\u20D2": "nGt", "\u226C": "twixt", "\u2272": "lsim", "\u2274": "nlsim", "\u2273": "gsim", "\u2275": "ngsim", "\u2276": "lg", "\u2278": "ntlg", "\u2277": "gl", "\u2279": "ntgl", "\u227A": "pr", "\u2280": "npr", "\u227B": "sc", "\u2281": "nsc", "\u227C": "prcue", "\u22E0": "nprcue", "\u227D": "sccue", "\u22E1": "nsccue", "\u227E": "prsim", "\u227F": "scsim", "\u227F\u0338": "NotSucceedsTilde", "\u2282": "sub", "\u2284": "nsub", "\u2282\u20D2": "vnsub", "\u2283": "sup", "\u2285": "nsup", "\u2283\u20D2": "vnsup", "\u2286": "sube", "\u2288": "nsube", "\u2287": "supe", "\u2289": "nsupe", "\u228A\uFE00": "vsubne", "\u228A": "subne", "\u228B\uFE00": "vsupne", "\u228B": "supne", "\u228D": "cupdot", "\u228E": "uplus", "\u228F": "sqsub", "\u228F\u0338": "NotSquareSubset", "\u2290": "sqsup", "\u2290\u0338": "NotSquareSuperset", "\u2291": "sqsube", "\u22E2": "nsqsube", "\u2292": "sqsupe", "\u22E3": "nsqsupe", "\u2293": "sqcap", "\u2293\uFE00": "sqcaps", "\u2294": "sqcup", "\u2294\uFE00": "sqcups", "\u2295": "oplus", "\u2296": "ominus", "\u2297": "otimes", "\u2298": "osol", "\u2299": "odot", "\u229A": "ocir", "\u229B": "oast", "\u229D": "odash", "\u229E": "plusb", "\u229F": "minusb", "\u22A0": "timesb", "\u22A1": "sdotb", "\u22A2": "vdash", "\u22AC": "nvdash", "\u22A3": "dashv", "\u22A4": "top", "\u22A5": "bot", "\u22A7": "models", "\u22A8": "vDash", "\u22AD": "nvDash", "\u22A9": "Vdash", "\u22AE": "nVdash", "\u22AA": "Vvdash", "\u22AB": "VDash", "\u22AF": "nVDash", "\u22B0": "prurel", "\u22B2": "vltri", "\u22EA": "nltri", "\u22B3": "vrtri", "\u22EB": "nrtri", "\u22B4": "ltrie", "\u22EC": "nltrie", "\u22B4\u20D2": "nvltrie", "\u22B5": "rtrie", "\u22ED": "nrtrie", "\u22B5\u20D2": "nvrtrie", "\u22B6": "origof", "\u22B7": "imof", "\u22B8": "mumap", "\u22B9": "hercon", "\u22BA": "intcal", "\u22BB": "veebar", "\u22BD": "barvee", "\u22BE": "angrtvb", "\u22BF": "lrtri", "\u22C0": "Wedge", "\u22C1": "Vee", "\u22C2": "xcap", "\u22C3": "xcup", "\u22C4": "diam", "\u22C5": "sdot", "\u22C6": "Star", "\u22C7": "divonx", "\u22C8": "bowtie", "\u22C9": "ltimes", "\u22CA": "rtimes", "\u22CB": "lthree", "\u22CC": "rthree", "\u22CD": "bsime", "\u22CE": "cuvee", "\u22CF": "cuwed", "\u22D0": "Sub", "\u22D1": "Sup", "\u22D2": "Cap", "\u22D3": "Cup", "\u22D4": "fork", "\u22D5": "epar", "\u22D6": "ltdot", "\u22D7": "gtdot", "\u22D8": "Ll", "\u22D8\u0338": "nLl", "\u22D9": "Gg", "\u22D9\u0338": "nGg", "\u22DA\uFE00": "lesg", "\u22DA": "leg", "\u22DB": "gel", "\u22DB\uFE00": "gesl", "\u22DE": "cuepr", "\u22DF": "cuesc", "\u22E6": "lnsim", "\u22E7": "gnsim", "\u22E8": "prnsim", "\u22E9": "scnsim", "\u22EE": "vellip", "\u22EF": "ctdot", "\u22F0": "utdot", "\u22F1": "dtdot", "\u22F2": "disin", "\u22F3": "isinsv", "\u22F4": "isins", "\u22F5": "isindot", "\u22F5\u0338": "notindot", "\u22F6": "notinvc", "\u22F7": "notinvb", "\u22F9": "isinE", "\u22F9\u0338": "notinE", "\u22FA": "nisd", "\u22FB": "xnis", "\u22FC": "nis", "\u22FD": "notnivc", "\u22FE": "notnivb", "\u2305": "barwed", "\u2306": "Barwed", "\u230C": "drcrop", "\u230D": "dlcrop", "\u230E": "urcrop", "\u230F": "ulcrop", "\u2310": "bnot", "\u2312": "profline", "\u2313": "profsurf", "\u2315": "telrec", "\u2316": "target", "\u231C": "ulcorn", "\u231D": "urcorn", "\u231E": "dlcorn", "\u231F": "drcorn", "\u2322": "frown", "\u2323": "smile", "\u232D": "cylcty", "\u232E": "profalar", "\u2336": "topbot", "\u233D": "ovbar", "\u233F": "solbar", "\u237C": "angzarr", "\u23B0": "lmoust", "\u23B1": "rmoust", "\u23B4": "tbrk", "\u23B5": "bbrk", "\u23B6": "bbrktbrk", "\u23DC": "OverParenthesis", "\u23DD": "UnderParenthesis", "\u23DE": "OverBrace", "\u23DF": "UnderBrace", "\u23E2": "trpezium", "\u23E7": "elinters", "\u2423": "blank", "\u2500": "boxh", "\u2502": "boxv", "\u250C": "boxdr", "\u2510": "boxdl", "\u2514": "boxur", "\u2518": "boxul", "\u251C": "boxvr", "\u2524": "boxvl", "\u252C": "boxhd", "\u2534": "boxhu", "\u253C": "boxvh", "\u2550": "boxH", "\u2551": "boxV", "\u2552": "boxdR", "\u2553": "boxDr", "\u2554": "boxDR", "\u2555": "boxdL", "\u2556": "boxDl", "\u2557": "boxDL", "\u2558": "boxuR", "\u2559": "boxUr", "\u255A": "boxUR", "\u255B": "boxuL", "\u255C": "boxUl", "\u255D": "boxUL", "\u255E": "boxvR", "\u255F": "boxVr", "\u2560": "boxVR", "\u2561": "boxvL", "\u2562": "boxVl", "\u2563": "boxVL", "\u2564": "boxHd", "\u2565": "boxhD", "\u2566": "boxHD", "\u2567": "boxHu", "\u2568": "boxhU", "\u2569": "boxHU", "\u256A": "boxvH", "\u256B": "boxVh", "\u256C": "boxVH", "\u2580": "uhblk", "\u2584": "lhblk", "\u2588": "block", "\u2591": "blk14", "\u2592": "blk12", "\u2593": "blk34", "\u25A1": "squ", "\u25AA": "squf", "\u25AB": "EmptyVerySmallSquare", "\u25AD": "rect", "\u25AE": "marker", "\u25B1": "fltns", "\u25B3": "xutri", "\u25B4": "utrif", "\u25B5": "utri", "\u25B8": "rtrif", "\u25B9": "rtri", "\u25BD": "xdtri", "\u25BE": "dtrif", "\u25BF": "dtri", "\u25C2": "ltrif", "\u25C3": "ltri", "\u25CA": "loz", "\u25CB": "cir", "\u25EC": "tridot", "\u25EF": "xcirc", "\u25F8": "ultri", "\u25F9": "urtri", "\u25FA": "lltri", "\u25FB": "EmptySmallSquare", "\u25FC": "FilledSmallSquare", "\u2605": "starf", "\u2606": "star", "\u260E": "phone", "\u2640": "female", "\u2642": "male", "\u2660": "spades", "\u2663": "clubs", "\u2665": "hearts", "\u2666": "diams", "\u266A": "sung", "\u2713": "check", "\u2717": "cross", "\u2720": "malt", "\u2736": "sext", "\u2758": "VerticalSeparator", "\u27C8": "bsolhsub", "\u27C9": "suphsol", "\u27F5": "xlarr", "\u27F6": "xrarr", "\u27F7": "xharr", "\u27F8": "xlArr", "\u27F9": "xrArr", "\u27FA": "xhArr", "\u27FC": "xmap", "\u27FF": "dzigrarr", "\u2902": "nvlArr", "\u2903": "nvrArr", "\u2904": "nvHarr", "\u2905": "Map", "\u290C": "lbarr", "\u290D": "rbarr", "\u290E": "lBarr", "\u290F": "rBarr", "\u2910": "RBarr", "\u2911": "DDotrahd", "\u2912": "UpArrowBar", "\u2913": "DownArrowBar", "\u2916": "Rarrtl", "\u2919": "latail", "\u291A": "ratail", "\u291B": "lAtail", "\u291C": "rAtail", "\u291D": "larrfs", "\u291E": "rarrfs", "\u291F": "larrbfs", "\u2920": "rarrbfs", "\u2923": "nwarhk", "\u2924": "nearhk", "\u2925": "searhk", "\u2926": "swarhk", "\u2927": "nwnear", "\u2928": "toea", "\u2929": "tosa", "\u292A": "swnwar", "\u2933": "rarrc", "\u2933\u0338": "nrarrc", "\u2935": "cudarrr", "\u2936": "ldca", "\u2937": "rdca", "\u2938": "cudarrl", "\u2939": "larrpl", "\u293C": "curarrm", "\u293D": "cularrp", "\u2945": "rarrpl", "\u2948": "harrcir", "\u2949": "Uarrocir", "\u294A": "lurdshar", "\u294B": "ldrushar", "\u294E": "LeftRightVector", "\u294F": "RightUpDownVector", "\u2950": "DownLeftRightVector", "\u2951": "LeftUpDownVector", "\u2952": "LeftVectorBar", "\u2953": "RightVectorBar", "\u2954": "RightUpVectorBar", "\u2955": "RightDownVectorBar", "\u2956": "DownLeftVectorBar", "\u2957": "DownRightVectorBar", "\u2958": "LeftUpVectorBar", "\u2959": "LeftDownVectorBar", "\u295A": "LeftTeeVector", "\u295B": "RightTeeVector", "\u295C": "RightUpTeeVector", "\u295D": "RightDownTeeVector", "\u295E": "DownLeftTeeVector", "\u295F": "DownRightTeeVector", "\u2960": "LeftUpTeeVector", "\u2961": "LeftDownTeeVector", "\u2962": "lHar", "\u2963": "uHar", "\u2964": "rHar", "\u2965": "dHar", "\u2966": "luruhar", "\u2967": "ldrdhar", "\u2968": "ruluhar", "\u2969": "rdldhar", "\u296A": "lharul", "\u296B": "llhard", "\u296C": "rharul", "\u296D": "lrhard", "\u296E": "udhar", "\u296F": "duhar", "\u2970": "RoundImplies", "\u2971": "erarr", "\u2972": "simrarr", "\u2973": "larrsim", "\u2974": "rarrsim", "\u2975": "rarrap", "\u2976": "ltlarr", "\u2978": "gtrarr", "\u2979": "subrarr", "\u297B": "suplarr", "\u297C": "lfisht", "\u297D": "rfisht", "\u297E": "ufisht", "\u297F": "dfisht", "\u299A": "vzigzag", "\u299C": "vangrt", "\u299D": "angrtvbd", "\u29A4": "ange", "\u29A5": "range", "\u29A6": "dwangle", "\u29A7": "uwangle", "\u29A8": "angmsdaa", "\u29A9": "angmsdab", "\u29AA": "angmsdac", "\u29AB": "angmsdad", "\u29AC": "angmsdae", "\u29AD": "angmsdaf", "\u29AE": "angmsdag", "\u29AF": "angmsdah", "\u29B0": "bemptyv", "\u29B1": "demptyv", "\u29B2": "cemptyv", "\u29B3": "raemptyv", "\u29B4": "laemptyv", "\u29B5": "ohbar", "\u29B6": "omid", "\u29B7": "opar", "\u29B9": "operp", "\u29BB": "olcross", "\u29BC": "odsold", "\u29BE": "olcir", "\u29BF": "ofcir", "\u29C0": "olt", "\u29C1": "ogt", "\u29C2": "cirscir", "\u29C3": "cirE", "\u29C4": "solb", "\u29C5": "bsolb", "\u29C9": "boxbox", "\u29CD": "trisb", "\u29CE": "rtriltri", "\u29CF": "LeftTriangleBar", "\u29CF\u0338": "NotLeftTriangleBar", "\u29D0": "RightTriangleBar", "\u29D0\u0338": "NotRightTriangleBar", "\u29DC": "iinfin", "\u29DD": "infintie", "\u29DE": "nvinfin", "\u29E3": "eparsl", "\u29E4": "smeparsl", "\u29E5": "eqvparsl", "\u29EB": "lozf", "\u29F4": "RuleDelayed", "\u29F6": "dsol", "\u2A00": "xodot", "\u2A01": "xoplus", "\u2A02": "xotime", "\u2A04": "xuplus", "\u2A06": "xsqcup", "\u2A0D": "fpartint", "\u2A10": "cirfnint", "\u2A11": "awint", "\u2A12": "rppolint", "\u2A13": "scpolint", "\u2A14": "npolint", "\u2A15": "pointint", "\u2A16": "quatint", "\u2A17": "intlarhk", "\u2A22": "pluscir", "\u2A23": "plusacir", "\u2A24": "simplus", "\u2A25": "plusdu", "\u2A26": "plussim", "\u2A27": "plustwo", "\u2A29": "mcomma", "\u2A2A": "minusdu", "\u2A2D": "loplus", "\u2A2E": "roplus", "\u2A2F": "Cross", "\u2A30": "timesd", "\u2A31": "timesbar", "\u2A33": "smashp", "\u2A34": "lotimes", "\u2A35": "rotimes", "\u2A36": "otimesas", "\u2A37": "Otimes", "\u2A38": "odiv", "\u2A39": "triplus", "\u2A3A": "triminus", "\u2A3B": "tritime", "\u2A3C": "iprod", "\u2A3F": "amalg", "\u2A40": "capdot", "\u2A42": "ncup", "\u2A43": "ncap", "\u2A44": "capand", "\u2A45": "cupor", "\u2A46": "cupcap", "\u2A47": "capcup", "\u2A48": "cupbrcap", "\u2A49": "capbrcup", "\u2A4A": "cupcup", "\u2A4B": "capcap", "\u2A4C": "ccups", "\u2A4D": "ccaps", "\u2A50": "ccupssm", "\u2A53": "And", "\u2A54": "Or", "\u2A55": "andand", "\u2A56": "oror", "\u2A57": "orslope", "\u2A58": "andslope", "\u2A5A": "andv", "\u2A5B": "orv", "\u2A5C": "andd", "\u2A5D": "ord", "\u2A5F": "wedbar", "\u2A66": "sdote", "\u2A6A": "simdot", "\u2A6D": "congdot", "\u2A6D\u0338": "ncongdot", "\u2A6E": "easter", "\u2A6F": "apacir", "\u2A70": "apE", "\u2A70\u0338": "napE", "\u2A71": "eplus", "\u2A72": "pluse", "\u2A73": "Esim", "\u2A77": "eDDot", "\u2A78": "equivDD", "\u2A79": "ltcir", "\u2A7A": "gtcir", "\u2A7B": "ltquest", "\u2A7C": "gtquest", "\u2A7D": "les", "\u2A7D\u0338": "nles", "\u2A7E": "ges", "\u2A7E\u0338": "nges", "\u2A7F": "lesdot", "\u2A80": "gesdot", "\u2A81": "lesdoto", "\u2A82": "gesdoto", "\u2A83": "lesdotor", "\u2A84": "gesdotol", "\u2A85": "lap", "\u2A86": "gap", "\u2A87": "lne", "\u2A88": "gne", "\u2A89": "lnap", "\u2A8A": "gnap", "\u2A8B": "lEg", "\u2A8C": "gEl", "\u2A8D": "lsime", "\u2A8E": "gsime", "\u2A8F": "lsimg", "\u2A90": "gsiml", "\u2A91": "lgE", "\u2A92": "glE", "\u2A93": "lesges", "\u2A94": "gesles", "\u2A95": "els", "\u2A96": "egs", "\u2A97": "elsdot", "\u2A98": "egsdot", "\u2A99": "el", "\u2A9A": "eg", "\u2A9D": "siml", "\u2A9E": "simg", "\u2A9F": "simlE", "\u2AA0": "simgE", "\u2AA1": "LessLess", "\u2AA1\u0338": "NotNestedLessLess", "\u2AA2": "GreaterGreater", "\u2AA2\u0338": "NotNestedGreaterGreater", "\u2AA4": "glj", "\u2AA5": "gla", "\u2AA6": "ltcc", "\u2AA7": "gtcc", "\u2AA8": "lescc", "\u2AA9": "gescc", "\u2AAA": "smt", "\u2AAB": "lat", "\u2AAC": "smte", "\u2AAC\uFE00": "smtes", "\u2AAD": "late", "\u2AAD\uFE00": "lates", "\u2AAE": "bumpE", "\u2AAF": "pre", "\u2AAF\u0338": "npre", "\u2AB0": "sce", "\u2AB0\u0338": "nsce", "\u2AB3": "prE", "\u2AB4": "scE", "\u2AB5": "prnE", "\u2AB6": "scnE", "\u2AB7": "prap", "\u2AB8": "scap", "\u2AB9": "prnap", "\u2ABA": "scnap", "\u2ABB": "Pr", "\u2ABC": "Sc", "\u2ABD": "subdot", "\u2ABE": "supdot", "\u2ABF": "subplus", "\u2AC0": "supplus", "\u2AC1": "submult", "\u2AC2": "supmult", "\u2AC3": "subedot", "\u2AC4": "supedot", "\u2AC5": "subE", "\u2AC5\u0338": "nsubE", "\u2AC6": "supE", "\u2AC6\u0338": "nsupE", "\u2AC7": "subsim", "\u2AC8": "supsim", "\u2ACB\uFE00": "vsubnE", "\u2ACB": "subnE", "\u2ACC\uFE00": "vsupnE", "\u2ACC": "supnE", "\u2ACF": "csub", "\u2AD0": "csup", "\u2AD1": "csube", "\u2AD2": "csupe", "\u2AD3": "subsup", "\u2AD4": "supsub", "\u2AD5": "subsub", "\u2AD6": "supsup", "\u2AD7": "suphsub", "\u2AD8": "supdsub", "\u2AD9": "forkv", "\u2ADA": "topfork", "\u2ADB": "mlcp", "\u2AE4": "Dashv", "\u2AE6": "Vdashl", "\u2AE7": "Barv", "\u2AE8": "vBar", "\u2AE9": "vBarv", "\u2AEB": "Vbar", "\u2AEC": "Not", "\u2AED": "bNot", "\u2AEE": "rnmid", "\u2AEF": "cirmid", "\u2AF0": "midcir", "\u2AF1": "topcir", "\u2AF2": "nhpar", "\u2AF3": "parsim", "\u2AFD": "parsl", "\u2AFD\u20E5": "nparsl", "\u266D": "flat", "\u266E": "natur", "\u266F": "sharp", "\xA4": "curren", "\xA2": "cent", "$": "dollar", "\xA3": "pound", "\xA5": "yen", "\u20AC": "euro", "\xB9": "sup1", "\xBD": "half", "\u2153": "frac13", "\xBC": "frac14", "\u2155": "frac15", "\u2159": "frac16", "\u215B": "frac18", "\xB2": "sup2", "\u2154": "frac23", "\u2156": "frac25", "\xB3": "sup3", "\xBE": "frac34", "\u2157": "frac35", "\u215C": "frac38", "\u2158": "frac45", "\u215A": "frac56", "\u215D": "frac58", "\u215E": "frac78", "\u{1D4B6}": "ascr", "\u{1D552}": "aopf", "\u{1D51E}": "afr", "\u{1D538}": "Aopf", "\u{1D504}": "Afr", "\u{1D49C}": "Ascr", "\xAA": "ordf", "\xE1": "aacute", "\xC1": "Aacute", "\xE0": "agrave", "\xC0": "Agrave", "\u0103": "abreve", "\u0102": "Abreve", "\xE2": "acirc", "\xC2": "Acirc", "\xE5": "aring", "\xC5": "angst", "\xE4": "auml", "\xC4": "Auml", "\xE3": "atilde", "\xC3": "Atilde", "\u0105": "aogon", "\u0104": "Aogon", "\u0101": "amacr", "\u0100": "Amacr", "\xE6": "aelig", "\xC6": "AElig", "\u{1D4B7}": "bscr", "\u{1D553}": "bopf", "\u{1D51F}": "bfr", "\u{1D539}": "Bopf", "\u212C": "Bscr", "\u{1D505}": "Bfr", "\u{1D520}": "cfr", "\u{1D4B8}": "cscr", "\u{1D554}": "copf", "\u212D": "Cfr", "\u{1D49E}": "Cscr", "\u2102": "Copf", "\u0107": "cacute", "\u0106": "Cacute", "\u0109": "ccirc", "\u0108": "Ccirc", "\u010D": "ccaron", "\u010C": "Ccaron", "\u010B": "cdot", "\u010A": "Cdot", "\xE7": "ccedil", "\xC7": "Ccedil", "\u2105": "incare", "\u{1D521}": "dfr", "\u2146": "dd", "\u{1D555}": "dopf", "\u{1D4B9}": "dscr", "\u{1D49F}": "Dscr", "\u{1D507}": "Dfr", "\u2145": "DD", "\u{1D53B}": "Dopf", "\u010F": "dcaron", "\u010E": "Dcaron", "\u0111": "dstrok", "\u0110": "Dstrok", "\xF0": "eth", "\xD0": "ETH", "\u2147": "ee", "\u212F": "escr", "\u{1D522}": "efr", "\u{1D556}": "eopf", "\u2130": "Escr", "\u{1D508}": "Efr", "\u{1D53C}": "Eopf", "\xE9": "eacute", "\xC9": "Eacute", "\xE8": "egrave", "\xC8": "Egrave", "\xEA": "ecirc", "\xCA": "Ecirc", "\u011B": "ecaron", "\u011A": "Ecaron", "\xEB": "euml", "\xCB": "Euml", "\u0117": "edot", "\u0116": "Edot", "\u0119": "eogon", "\u0118": "Eogon", "\u0113": "emacr", "\u0112": "Emacr", "\u{1D523}": "ffr", "\u{1D557}": "fopf", "\u{1D4BB}": "fscr", "\u{1D509}": "Ffr", "\u{1D53D}": "Fopf", "\u2131": "Fscr", "\uFB00": "fflig", "\uFB03": "ffilig", "\uFB04": "ffllig", "\uFB01": "filig", "fj": "fjlig", "\uFB02": "fllig", "\u0192": "fnof", "\u210A": "gscr", "\u{1D558}": "gopf", "\u{1D524}": "gfr", "\u{1D4A2}": "Gscr", "\u{1D53E}": "Gopf", "\u{1D50A}": "Gfr", "\u01F5": "gacute", "\u011F": "gbreve", "\u011E": "Gbreve", "\u011D": "gcirc", "\u011C": "Gcirc", "\u0121": "gdot", "\u0120": "Gdot", "\u0122": "Gcedil", "\u{1D525}": "hfr", "\u210E": "planckh", "\u{1D4BD}": "hscr", "\u{1D559}": "hopf", "\u210B": "Hscr", "\u210C": "Hfr", "\u210D": "Hopf", "\u0125": "hcirc", "\u0124": "Hcirc", "\u210F": "hbar", "\u0127": "hstrok", "\u0126": "Hstrok", "\u{1D55A}": "iopf", "\u{1D526}": "ifr", "\u{1D4BE}": "iscr", "\u2148": "ii", "\u{1D540}": "Iopf", "\u2110": "Iscr", "\u2111": "Im", "\xED": "iacute", "\xCD": "Iacute", "\xEC": "igrave", "\xCC": "Igrave", "\xEE": "icirc", "\xCE": "Icirc", "\xEF": "iuml", "\xCF": "Iuml", "\u0129": "itilde", "\u0128": "Itilde", "\u0130": "Idot", "\u012F": "iogon", "\u012E": "Iogon", "\u012B": "imacr", "\u012A": "Imacr", "\u0133": "ijlig", "\u0132": "IJlig", "\u0131": "imath", "\u{1D4BF}": "jscr", "\u{1D55B}": "jopf", "\u{1D527}": "jfr", "\u{1D4A5}": "Jscr", "\u{1D50D}": "Jfr", "\u{1D541}": "Jopf", "\u0135": "jcirc", "\u0134": "Jcirc", "\u0237": "jmath", "\u{1D55C}": "kopf", "\u{1D4C0}": "kscr", "\u{1D528}": "kfr", "\u{1D4A6}": "Kscr", "\u{1D542}": "Kopf", "\u{1D50E}": "Kfr", "\u0137": "kcedil", "\u0136": "Kcedil", "\u{1D529}": "lfr", "\u{1D4C1}": "lscr", "\u2113": "ell", "\u{1D55D}": "lopf", "\u2112": "Lscr", "\u{1D50F}": "Lfr", "\u{1D543}": "Lopf", "\u013A": "lacute", "\u0139": "Lacute", "\u013E": "lcaron", "\u013D": "Lcaron", "\u013C": "lcedil", "\u013B": "Lcedil", "\u0142": "lstrok", "\u0141": "Lstrok", "\u0140": "lmidot", "\u013F": "Lmidot", "\u{1D52A}": "mfr", "\u{1D55E}": "mopf", "\u{1D4C2}": "mscr", "\u{1D510}": "Mfr", "\u{1D544}": "Mopf", "\u2133": "Mscr", "\u{1D52B}": "nfr", "\u{1D55F}": "nopf", "\u{1D4C3}": "nscr", "\u2115": "Nopf", "\u{1D4A9}": "Nscr", "\u{1D511}": "Nfr", "\u0144": "nacute", "\u0143": "Nacute", "\u0148": "ncaron", "\u0147": "Ncaron", "\xF1": "ntilde", "\xD1": "Ntilde", "\u0146": "ncedil", "\u0145": "Ncedil", "\u2116": "numero", "\u014B": "eng", "\u014A": "ENG", "\u{1D560}": "oopf", "\u{1D52C}": "ofr", "\u2134": "oscr", "\u{1D4AA}": "Oscr", "\u{1D512}": "Ofr", "\u{1D546}": "Oopf", "\xBA": "ordm", "\xF3": "oacute", "\xD3": "Oacute", "\xF2": "ograve", "\xD2": "Ograve", "\xF4": "ocirc", "\xD4": "Ocirc", "\xF6": "ouml", "\xD6": "Ouml", "\u0151": "odblac", "\u0150": "Odblac", "\xF5": "otilde", "\xD5": "Otilde", "\xF8": "oslash", "\xD8": "Oslash", "\u014D": "omacr", "\u014C": "Omacr", "\u0153": "oelig", "\u0152": "OElig", "\u{1D52D}": "pfr", "\u{1D4C5}": "pscr", "\u{1D561}": "popf", "\u2119": "Popf", "\u{1D513}": "Pfr", "\u{1D4AB}": "Pscr", "\u{1D562}": "qopf", "\u{1D52E}": "qfr", "\u{1D4C6}": "qscr", "\u{1D4AC}": "Qscr", "\u{1D514}": "Qfr", "\u211A": "Qopf", "\u0138": "kgreen", "\u{1D52F}": "rfr", "\u{1D563}": "ropf", "\u{1D4C7}": "rscr", "\u211B": "Rscr", "\u211C": "Re", "\u211D": "Ropf", "\u0155": "racute", "\u0154": "Racute", "\u0159": "rcaron", "\u0158": "Rcaron", "\u0157": "rcedil", "\u0156": "Rcedil", "\u{1D564}": "sopf", "\u{1D4C8}": "sscr", "\u{1D530}": "sfr", "\u{1D54A}": "Sopf", "\u{1D516}": "Sfr", "\u{1D4AE}": "Sscr", "\u24C8": "oS", "\u015B": "sacute", "\u015A": "Sacute", "\u015D": "scirc", "\u015C": "Scirc", "\u0161": "scaron", "\u0160": "Scaron", "\u015F": "scedil", "\u015E": "Scedil", "\xDF": "szlig", "\u{1D531}": "tfr", "\u{1D4C9}": "tscr", "\u{1D565}": "topf", "\u{1D4AF}": "Tscr", "\u{1D517}": "Tfr", "\u{1D54B}": "Topf", "\u0165": "tcaron", "\u0164": "Tcaron", "\u0163": "tcedil", "\u0162": "Tcedil", "\u2122": "trade", "\u0167": "tstrok", "\u0166": "Tstrok", "\u{1D4CA}": "uscr", "\u{1D566}": "uopf", "\u{1D532}": "ufr", "\u{1D54C}": "Uopf", "\u{1D518}": "Ufr", "\u{1D4B0}": "Uscr", "\xFA": "uacute", "\xDA": "Uacute", "\xF9": "ugrave", "\xD9": "Ugrave", "\u016D": "ubreve", "\u016C": "Ubreve", "\xFB": "ucirc", "\xDB": "Ucirc", "\u016F": "uring", "\u016E": "Uring", "\xFC": "uuml", "\xDC": "Uuml", "\u0171": "udblac", "\u0170": "Udblac", "\u0169": "utilde", "\u0168": "Utilde", "\u0173": "uogon", "\u0172": "Uogon", "\u016B": "umacr", "\u016A": "Umacr", "\u{1D533}": "vfr", "\u{1D567}": "vopf", "\u{1D4CB}": "vscr", "\u{1D519}": "Vfr", "\u{1D54D}": "Vopf", "\u{1D4B1}": "Vscr", "\u{1D568}": "wopf", "\u{1D4CC}": "wscr", "\u{1D534}": "wfr", "\u{1D4B2}": "Wscr", "\u{1D54E}": "Wopf", "\u{1D51A}": "Wfr", "\u0175": "wcirc", "\u0174": "Wcirc", "\u{1D535}": "xfr", "\u{1D4CD}": "xscr", "\u{1D569}": "xopf", "\u{1D54F}": "Xopf", "\u{1D51B}": "Xfr", "\u{1D4B3}": "Xscr", "\u{1D536}": "yfr", "\u{1D4CE}": "yscr", "\u{1D56A}": "yopf", "\u{1D4B4}": "Yscr", "\u{1D51C}": "Yfr", "\u{1D550}": "Yopf", "\xFD": "yacute", "\xDD": "Yacute", "\u0177": "ycirc", "\u0176": "Ycirc", "\xFF": "yuml", "\u0178": "Yuml", "\u{1D4CF}": "zscr", "\u{1D537}": "zfr", "\u{1D56B}": "zopf", "\u2128": "Zfr", "\u2124": "Zopf", "\u{1D4B5}": "Zscr", "\u017A": "zacute", "\u0179": "Zacute", "\u017E": "zcaron", "\u017D": "Zcaron", "\u017C": "zdot", "\u017B": "Zdot", "\u01B5": "imped", "\xFE": "thorn", "\xDE": "THORN", "\u0149": "napos", "\u03B1": "alpha", "\u0391": "Alpha", "\u03B2": "beta", "\u0392": "Beta", "\u03B3": "gamma", "\u0393": "Gamma", "\u03B4": "delta", "\u0394": "Delta", "\u03B5": "epsi", "\u03F5": "epsiv", "\u0395": "Epsilon", "\u03DD": "gammad", "\u03DC": "Gammad", "\u03B6": "zeta", "\u0396": "Zeta", "\u03B7": "eta", "\u0397": "Eta", "\u03B8": "theta", "\u03D1": "thetav", "\u0398": "Theta", "\u03B9": "iota", "\u0399": "Iota", "\u03BA": "kappa", "\u03F0": "kappav", "\u039A": "Kappa", "\u03BB": "lambda", "\u039B": "Lambda", "\u03BC": "mu", "\xB5": "micro", "\u039C": "Mu", "\u03BD": "nu", "\u039D": "Nu", "\u03BE": "xi", "\u039E": "Xi", "\u03BF": "omicron", "\u039F": "Omicron", "\u03C0": "pi", "\u03D6": "piv", "\u03A0": "Pi", "\u03C1": "rho", "\u03F1": "rhov", "\u03A1": "Rho", "\u03C3": "sigma", "\u03A3": "Sigma", "\u03C2": "sigmaf", "\u03C4": "tau", "\u03A4": "Tau", "\u03C5": "upsi", "\u03A5": "Upsilon", "\u03D2": "Upsi", "\u03C6": "phi", "\u03D5": "phiv", "\u03A6": "Phi", "\u03C7": "chi", "\u03A7": "Chi", "\u03C8": "psi", "\u03A8": "Psi", "\u03C9": "omega", "\u03A9": "ohm", "\u0430": "acy", "\u0410": "Acy", "\u0431": "bcy", "\u0411": "Bcy", "\u0432": "vcy", "\u0412": "Vcy", "\u0433": "gcy", "\u0413": "Gcy", "\u0453": "gjcy", "\u0403": "GJcy", "\u0434": "dcy", "\u0414": "Dcy", "\u0452": "djcy", "\u0402": "DJcy", "\u0435": "iecy", "\u0415": "IEcy", "\u0451": "iocy", "\u0401": "IOcy", "\u0454": "jukcy", "\u0404": "Jukcy", "\u0436": "zhcy", "\u0416": "ZHcy", "\u0437": "zcy", "\u0417": "Zcy", "\u0455": "dscy", "\u0405": "DScy", "\u0438": "icy", "\u0418": "Icy", "\u0456": "iukcy", "\u0406": "Iukcy", "\u0457": "yicy", "\u0407": "YIcy", "\u0439": "jcy", "\u0419": "Jcy", "\u0458": "jsercy", "\u0408": "Jsercy", "\u043A": "kcy", "\u041A": "Kcy", "\u045C": "kjcy", "\u040C": "KJcy", "\u043B": "lcy", "\u041B": "Lcy", "\u0459": "ljcy", "\u0409": "LJcy", "\u043C": "mcy", "\u041C": "Mcy", "\u043D": "ncy", "\u041D": "Ncy", "\u045A": "njcy", "\u040A": "NJcy", "\u043E": "ocy", "\u041E": "Ocy", "\u043F": "pcy", "\u041F": "Pcy", "\u0440": "rcy", "\u0420": "Rcy", "\u0441": "scy", "\u0421": "Scy", "\u0442": "tcy", "\u0422": "Tcy", "\u045B": "tshcy", "\u040B": "TSHcy", "\u0443": "ucy", "\u0423": "Ucy", "\u045E": "ubrcy", "\u040E": "Ubrcy", "\u0444": "fcy", "\u0424": "Fcy", "\u0445": "khcy", "\u0425": "KHcy", "\u0446": "tscy", "\u0426": "TScy", "\u0447": "chcy", "\u0427": "CHcy", "\u045F": "dzcy", "\u040F": "DZcy", "\u0448": "shcy", "\u0428": "SHcy", "\u0449": "shchcy", "\u0429": "SHCHcy", "\u044A": "hardcy", "\u042A": "HARDcy", "\u044B": "ycy", "\u042B": "Ycy", "\u044C": "softcy", "\u042C": "SOFTcy", "\u044D": "ecy", "\u042D": "Ecy", "\u044E": "yucy", "\u042E": "YUcy", "\u044F": "yacy", "\u042F": "YAcy", "\u2135": "aleph", "\u2136": "beth", "\u2137": "gimel", "\u2138": "daleth" };
    var regexEscape = /["&'<>`]/g;
    var escapeMap = {
      '"': "&quot;",
      "&": "&amp;",
      "'": "&#x27;",
      "<": "&lt;",
      ">": "&gt;",
      "`": "&#x60;"
    };
    var regexInvalidEntity = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/;
    var regexInvalidRawCodePoint = /[\0-\x08\x0B\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
    var regexDecode = /&(CounterClockwiseContourIntegral|DoubleLongLeftRightArrow|ClockwiseContourIntegral|NotNestedGreaterGreater|NotSquareSupersetEqual|DiacriticalDoubleAcute|NotRightTriangleEqual|NotSucceedsSlantEqual|NotPrecedesSlantEqual|CloseCurlyDoubleQuote|NegativeVeryThinSpace|DoubleContourIntegral|FilledVerySmallSquare|CapitalDifferentialD|OpenCurlyDoubleQuote|EmptyVerySmallSquare|NestedGreaterGreater|DoubleLongRightArrow|NotLeftTriangleEqual|NotGreaterSlantEqual|ReverseUpEquilibrium|DoubleLeftRightArrow|NotSquareSubsetEqual|NotDoubleVerticalBar|RightArrowLeftArrow|NotGreaterFullEqual|NotRightTriangleBar|SquareSupersetEqual|DownLeftRightVector|DoubleLongLeftArrow|leftrightsquigarrow|LeftArrowRightArrow|NegativeMediumSpace|blacktriangleright|RightDownVectorBar|PrecedesSlantEqual|RightDoubleBracket|SucceedsSlantEqual|NotLeftTriangleBar|RightTriangleEqual|SquareIntersection|RightDownTeeVector|ReverseEquilibrium|NegativeThickSpace|longleftrightarrow|Longleftrightarrow|LongLeftRightArrow|DownRightTeeVector|DownRightVectorBar|GreaterSlantEqual|SquareSubsetEqual|LeftDownVectorBar|LeftDoubleBracket|VerticalSeparator|rightleftharpoons|NotGreaterGreater|NotSquareSuperset|blacktriangleleft|blacktriangledown|NegativeThinSpace|LeftDownTeeVector|NotLessSlantEqual|leftrightharpoons|DoubleUpDownArrow|DoubleVerticalBar|LeftTriangleEqual|FilledSmallSquare|twoheadrightarrow|NotNestedLessLess|DownLeftTeeVector|DownLeftVectorBar|RightAngleBracket|NotTildeFullEqual|NotReverseElement|RightUpDownVector|DiacriticalTilde|NotSucceedsTilde|circlearrowright|NotPrecedesEqual|rightharpoondown|DoubleRightArrow|NotSucceedsEqual|NonBreakingSpace|NotRightTriangle|LessEqualGreater|RightUpTeeVector|LeftAngleBracket|GreaterFullEqual|DownArrowUpArrow|RightUpVectorBar|twoheadleftarrow|GreaterEqualLess|downharpoonright|RightTriangleBar|ntrianglerighteq|NotSupersetEqual|LeftUpDownVector|DiacriticalAcute|rightrightarrows|vartriangleright|UpArrowDownArrow|DiacriticalGrave|UnderParenthesis|EmptySmallSquare|LeftUpVectorBar|leftrightarrows|DownRightVector|downharpoonleft|trianglerighteq|ShortRightArrow|OverParenthesis|DoubleLeftArrow|DoubleDownArrow|NotSquareSubset|bigtriangledown|ntrianglelefteq|UpperRightArrow|curvearrowright|vartriangleleft|NotLeftTriangle|nleftrightarrow|LowerRightArrow|NotHumpDownHump|NotGreaterTilde|rightthreetimes|LeftUpTeeVector|NotGreaterEqual|straightepsilon|LeftTriangleBar|rightsquigarrow|ContourIntegral|rightleftarrows|CloseCurlyQuote|RightDownVector|LeftRightVector|nLeftrightarrow|leftharpoondown|circlearrowleft|SquareSuperset|OpenCurlyQuote|hookrightarrow|HorizontalLine|DiacriticalDot|NotLessGreater|ntriangleright|DoubleRightTee|InvisibleComma|InvisibleTimes|LowerLeftArrow|DownLeftVector|NotSubsetEqual|curvearrowleft|trianglelefteq|NotVerticalBar|TildeFullEqual|downdownarrows|NotGreaterLess|RightTeeVector|ZeroWidthSpace|looparrowright|LongRightArrow|doublebarwedge|ShortLeftArrow|ShortDownArrow|RightVectorBar|GreaterGreater|ReverseElement|rightharpoonup|LessSlantEqual|leftthreetimes|upharpoonright|rightarrowtail|LeftDownVector|Longrightarrow|NestedLessLess|UpperLeftArrow|nshortparallel|leftleftarrows|leftrightarrow|Leftrightarrow|LeftRightArrow|longrightarrow|upharpoonleft|RightArrowBar|ApplyFunction|LeftTeeVector|leftarrowtail|NotEqualTilde|varsubsetneqq|varsupsetneqq|RightTeeArrow|SucceedsEqual|SucceedsTilde|LeftVectorBar|SupersetEqual|hookleftarrow|DifferentialD|VerticalTilde|VeryThinSpace|blacktriangle|bigtriangleup|LessFullEqual|divideontimes|leftharpoonup|UpEquilibrium|ntriangleleft|RightTriangle|measuredangle|shortparallel|longleftarrow|Longleftarrow|LongLeftArrow|DoubleLeftTee|Poincareplane|PrecedesEqual|triangleright|DoubleUpArrow|RightUpVector|fallingdotseq|looparrowleft|PrecedesTilde|NotTildeEqual|NotTildeTilde|smallsetminus|Proportional|triangleleft|triangledown|UnderBracket|NotHumpEqual|exponentiale|ExponentialE|NotLessTilde|HilbertSpace|RightCeiling|blacklozenge|varsupsetneq|HumpDownHump|GreaterEqual|VerticalLine|LeftTeeArrow|NotLessEqual|DownTeeArrow|LeftTriangle|varsubsetneq|Intersection|NotCongruent|DownArrowBar|LeftUpVector|LeftArrowBar|risingdotseq|GreaterTilde|RoundImplies|SquareSubset|ShortUpArrow|NotSuperset|quaternions|precnapprox|backepsilon|preccurlyeq|OverBracket|blacksquare|MediumSpace|VerticalBar|circledcirc|circleddash|CircleMinus|CircleTimes|LessGreater|curlyeqprec|curlyeqsucc|diamondsuit|UpDownArrow|Updownarrow|RuleDelayed|Rrightarrow|updownarrow|RightVector|nRightarrow|nrightarrow|eqslantless|LeftCeiling|Equilibrium|SmallCircle|expectation|NotSucceeds|thickapprox|GreaterLess|SquareUnion|NotPrecedes|NotLessLess|straightphi|succnapprox|succcurlyeq|SubsetEqual|sqsupseteq|Proportion|Laplacetrf|ImaginaryI|supsetneqq|NotGreater|gtreqqless|NotElement|ThickSpace|TildeEqual|TildeTilde|Fouriertrf|rmoustache|EqualTilde|eqslantgtr|UnderBrace|LeftVector|UpArrowBar|nLeftarrow|nsubseteqq|subsetneqq|nsupseteqq|nleftarrow|succapprox|lessapprox|UpTeeArrow|upuparrows|curlywedge|lesseqqgtr|varepsilon|varnothing|RightFloor|complement|CirclePlus|sqsubseteq|Lleftarrow|circledast|RightArrow|Rightarrow|rightarrow|lmoustache|Bernoullis|precapprox|mapstoleft|mapstodown|longmapsto|dotsquare|downarrow|DoubleDot|nsubseteq|supsetneq|leftarrow|nsupseteq|subsetneq|ThinSpace|ngeqslant|subseteqq|HumpEqual|NotSubset|triangleq|NotCupCap|lesseqgtr|heartsuit|TripleDot|Leftarrow|Coproduct|Congruent|varpropto|complexes|gvertneqq|LeftArrow|LessTilde|supseteqq|MinusPlus|CircleDot|nleqslant|NotExists|gtreqless|nparallel|UnionPlus|LeftFloor|checkmark|CenterDot|centerdot|Mellintrf|gtrapprox|bigotimes|OverBrace|spadesuit|therefore|pitchfork|rationals|PlusMinus|Backslash|Therefore|DownBreve|backsimeq|backprime|DownArrow|nshortmid|Downarrow|lvertneqq|eqvparsl|imagline|imagpart|infintie|integers|Integral|intercal|LessLess|Uarrocir|intlarhk|sqsupset|angmsdaf|sqsubset|llcorner|vartheta|cupbrcap|lnapprox|Superset|SuchThat|succnsim|succneqq|angmsdag|biguplus|curlyvee|trpezium|Succeeds|NotTilde|bigwedge|angmsdah|angrtvbd|triminus|cwconint|fpartint|lrcorner|smeparsl|subseteq|urcorner|lurdshar|laemptyv|DDotrahd|approxeq|ldrushar|awconint|mapstoup|backcong|shortmid|triangle|geqslant|gesdotol|timesbar|circledR|circledS|setminus|multimap|naturals|scpolint|ncongdot|RightTee|boxminus|gnapprox|boxtimes|andslope|thicksim|angmsdaa|varsigma|cirfnint|rtriltri|angmsdab|rppolint|angmsdac|barwedge|drbkarow|clubsuit|thetasym|bsolhsub|capbrcup|dzigrarr|doteqdot|DotEqual|dotminus|UnderBar|NotEqual|realpart|otimesas|ulcorner|hksearow|hkswarow|parallel|PartialD|elinters|emptyset|plusacir|bbrktbrk|angmsdad|pointint|bigoplus|angmsdae|Precedes|bigsqcup|varkappa|notindot|supseteq|precneqq|precnsim|profalar|profline|profsurf|leqslant|lesdotor|raemptyv|subplus|notnivb|notnivc|subrarr|zigrarr|vzigzag|submult|subedot|Element|between|cirscir|larrbfs|larrsim|lotimes|lbrksld|lbrkslu|lozenge|ldrdhar|dbkarow|bigcirc|epsilon|simrarr|simplus|ltquest|Epsilon|luruhar|gtquest|maltese|npolint|eqcolon|npreceq|bigodot|ddagger|gtrless|bnequiv|harrcir|ddotseq|equivDD|backsim|demptyv|nsqsube|nsqsupe|Upsilon|nsubset|upsilon|minusdu|nsucceq|swarrow|nsupset|coloneq|searrow|boxplus|napprox|natural|asympeq|alefsym|congdot|nearrow|bigstar|diamond|supplus|tritime|LeftTee|nvinfin|triplus|NewLine|nvltrie|nvrtrie|nwarrow|nexists|Diamond|ruluhar|Implies|supmult|angzarr|suplarr|suphsub|questeq|because|digamma|Because|olcross|bemptyv|omicron|Omicron|rotimes|NoBreak|intprod|angrtvb|orderof|uwangle|suphsol|lesdoto|orslope|DownTee|realine|cudarrl|rdldhar|OverBar|supedot|lessdot|supdsub|topfork|succsim|rbrkslu|rbrksld|pertenk|cudarrr|isindot|planckh|lessgtr|pluscir|gesdoto|plussim|plustwo|lesssim|cularrp|rarrsim|Cayleys|notinva|notinvb|notinvc|UpArrow|Uparrow|uparrow|NotLess|dwangle|precsim|Product|curarrm|Cconint|dotplus|rarrbfs|ccupssm|Cedilla|cemptyv|notniva|quatint|frac35|frac38|frac45|frac56|frac58|frac78|tridot|xoplus|gacute|gammad|Gammad|lfisht|lfloor|bigcup|sqsupe|gbreve|Gbreve|lharul|sqsube|sqcups|Gcedil|apacir|llhard|lmidot|Lmidot|lmoust|andand|sqcaps|approx|Abreve|spades|circeq|tprime|divide|topcir|Assign|topbot|gesdot|divonx|xuplus|timesd|gesles|atilde|solbar|SOFTcy|loplus|timesb|lowast|lowbar|dlcorn|dlcrop|softcy|dollar|lparlt|thksim|lrhard|Atilde|lsaquo|smashp|bigvee|thinsp|wreath|bkarow|lsquor|lstrok|Lstrok|lthree|ltimes|ltlarr|DotDot|simdot|ltrPar|weierp|xsqcup|angmsd|sigmav|sigmaf|zeetrf|Zcaron|zcaron|mapsto|vsupne|thetav|cirmid|marker|mcomma|Zacute|vsubnE|there4|gtlPar|vsubne|bottom|gtrarr|SHCHcy|shchcy|midast|midcir|middot|minusb|minusd|gtrdot|bowtie|sfrown|mnplus|models|colone|seswar|Colone|mstpos|searhk|gtrsim|nacute|Nacute|boxbox|telrec|hairsp|Tcedil|nbumpe|scnsim|ncaron|Ncaron|ncedil|Ncedil|hamilt|Scedil|nearhk|hardcy|HARDcy|tcedil|Tcaron|commat|nequiv|nesear|tcaron|target|hearts|nexist|varrho|scedil|Scaron|scaron|hellip|Sacute|sacute|hercon|swnwar|compfn|rtimes|rthree|rsquor|rsaquo|zacute|wedgeq|homtht|barvee|barwed|Barwed|rpargt|horbar|conint|swarhk|roplus|nltrie|hslash|hstrok|Hstrok|rmoust|Conint|bprime|hybull|hyphen|iacute|Iacute|supsup|supsub|supsim|varphi|coprod|brvbar|agrave|Supset|supset|igrave|Igrave|notinE|Agrave|iiiint|iinfin|copysr|wedbar|Verbar|vangrt|becaus|incare|verbar|inodot|bullet|drcorn|intcal|drcrop|cularr|vellip|Utilde|bumpeq|cupcap|dstrok|Dstrok|CupCap|cupcup|cupdot|eacute|Eacute|supdot|iquest|easter|ecaron|Ecaron|ecolon|isinsv|utilde|itilde|Itilde|curarr|succeq|Bumpeq|cacute|ulcrop|nparsl|Cacute|nprcue|egrave|Egrave|nrarrc|nrarrw|subsup|subsub|nrtrie|jsercy|nsccue|Jsercy|kappav|kcedil|Kcedil|subsim|ulcorn|nsimeq|egsdot|veebar|kgreen|capand|elsdot|Subset|subset|curren|aacute|lacute|Lacute|emptyv|ntilde|Ntilde|lagran|lambda|Lambda|capcap|Ugrave|langle|subdot|emsp13|numero|emsp14|nvdash|nvDash|nVdash|nVDash|ugrave|ufisht|nvHarr|larrfs|nvlArr|larrhk|larrlp|larrpl|nvrArr|Udblac|nwarhk|larrtl|nwnear|oacute|Oacute|latail|lAtail|sstarf|lbrace|odblac|Odblac|lbrack|udblac|odsold|eparsl|lcaron|Lcaron|ograve|Ograve|lcedil|Lcedil|Aacute|ssmile|ssetmn|squarf|ldquor|capcup|ominus|cylcty|rharul|eqcirc|dagger|rfloor|rfisht|Dagger|daleth|equals|origof|capdot|equest|dcaron|Dcaron|rdquor|oslash|Oslash|otilde|Otilde|otimes|Otimes|urcrop|Ubreve|ubreve|Yacute|Uacute|uacute|Rcedil|rcedil|urcorn|parsim|Rcaron|Vdashl|rcaron|Tstrok|percnt|period|permil|Exists|yacute|rbrack|rbrace|phmmat|ccaron|Ccaron|planck|ccedil|plankv|tstrok|female|plusdo|plusdu|ffilig|plusmn|ffllig|Ccedil|rAtail|dfisht|bernou|ratail|Rarrtl|rarrtl|angsph|rarrpl|rarrlp|rarrhk|xwedge|xotime|forall|ForAll|Vvdash|vsupnE|preceq|bigcap|frac12|frac13|frac14|primes|rarrfs|prnsim|frac15|Square|frac16|square|lesdot|frac18|frac23|propto|prurel|rarrap|rangle|puncsp|frac25|Racute|qprime|racute|lesges|frac34|abreve|AElig|eqsim|utdot|setmn|urtri|Equal|Uring|seArr|uring|searr|dashv|Dashv|mumap|nabla|iogon|Iogon|sdote|sdotb|scsim|napid|napos|equiv|natur|Acirc|dblac|erarr|nbump|iprod|erDot|ucirc|awint|esdot|angrt|ncong|isinE|scnap|Scirc|scirc|ndash|isins|Ubrcy|nearr|neArr|isinv|nedot|ubrcy|acute|Ycirc|iukcy|Iukcy|xutri|nesim|caret|jcirc|Jcirc|caron|twixt|ddarr|sccue|exist|jmath|sbquo|ngeqq|angst|ccaps|lceil|ngsim|UpTee|delta|Delta|rtrif|nharr|nhArr|nhpar|rtrie|jukcy|Jukcy|kappa|rsquo|Kappa|nlarr|nlArr|TSHcy|rrarr|aogon|Aogon|fflig|xrarr|tshcy|ccirc|nleqq|filig|upsih|nless|dharl|nlsim|fjlig|ropar|nltri|dharr|robrk|roarr|fllig|fltns|roang|rnmid|subnE|subne|lAarr|trisb|Ccirc|acirc|ccups|blank|VDash|forkv|Vdash|langd|cedil|blk12|blk14|laquo|strns|diams|notin|vDash|larrb|blk34|block|disin|uplus|vdash|vBarv|aelig|starf|Wedge|check|xrArr|lates|lbarr|lBarr|notni|lbbrk|bcong|frasl|lbrke|frown|vrtri|vprop|vnsup|gamma|Gamma|wedge|xodot|bdquo|srarr|doteq|ldquo|boxdl|boxdL|gcirc|Gcirc|boxDl|boxDL|boxdr|boxdR|boxDr|TRADE|trade|rlhar|boxDR|vnsub|npart|vltri|rlarr|boxhd|boxhD|nprec|gescc|nrarr|nrArr|boxHd|boxHD|boxhu|boxhU|nrtri|boxHu|clubs|boxHU|times|colon|Colon|gimel|xlArr|Tilde|nsime|tilde|nsmid|nspar|THORN|thorn|xlarr|nsube|nsubE|thkap|xhArr|comma|nsucc|boxul|boxuL|nsupe|nsupE|gneqq|gnsim|boxUl|boxUL|grave|boxur|boxuR|boxUr|boxUR|lescc|angle|bepsi|boxvh|varpi|boxvH|numsp|Theta|gsime|gsiml|theta|boxVh|boxVH|boxvl|gtcir|gtdot|boxvL|boxVl|boxVL|crarr|cross|Cross|nvsim|boxvr|nwarr|nwArr|sqsup|dtdot|Uogon|lhard|lharu|dtrif|ocirc|Ocirc|lhblk|duarr|odash|sqsub|Hacek|sqcup|llarr|duhar|oelig|OElig|ofcir|boxvR|uogon|lltri|boxVr|csube|uuarr|ohbar|csupe|ctdot|olarr|olcir|harrw|oline|sqcap|omacr|Omacr|omega|Omega|boxVR|aleph|lneqq|lnsim|loang|loarr|rharu|lobrk|hcirc|operp|oplus|rhard|Hcirc|orarr|Union|order|ecirc|Ecirc|cuepr|szlig|cuesc|breve|reals|eDDot|Breve|hoarr|lopar|utrif|rdquo|Umacr|umacr|efDot|swArr|ultri|alpha|rceil|ovbar|swarr|Wcirc|wcirc|smtes|smile|bsemi|lrarr|aring|parsl|lrhar|bsime|uhblk|lrtri|cupor|Aring|uharr|uharl|slarr|rbrke|bsolb|lsime|rbbrk|RBarr|lsimg|phone|rBarr|rbarr|icirc|lsquo|Icirc|emacr|Emacr|ratio|simne|plusb|simlE|simgE|simeq|pluse|ltcir|ltdot|empty|xharr|xdtri|iexcl|Alpha|ltrie|rarrw|pound|ltrif|xcirc|bumpe|prcue|bumpE|asymp|amacr|cuvee|Sigma|sigma|iiint|udhar|iiota|ijlig|IJlig|supnE|imacr|Imacr|prime|Prime|image|prnap|eogon|Eogon|rarrc|mdash|mDDot|cuwed|imath|supne|imped|Amacr|udarr|prsim|micro|rarrb|cwint|raquo|infin|eplus|range|rangd|Ucirc|radic|minus|amalg|veeeq|rAarr|epsiv|ycirc|quest|sharp|quot|zwnj|Qscr|race|qscr|Qopf|qopf|qint|rang|Rang|Zscr|zscr|Zopf|zopf|rarr|rArr|Rarr|Pscr|pscr|prop|prod|prnE|prec|ZHcy|zhcy|prap|Zeta|zeta|Popf|popf|Zdot|plus|zdot|Yuml|yuml|phiv|YUcy|yucy|Yscr|yscr|perp|Yopf|yopf|part|para|YIcy|Ouml|rcub|yicy|YAcy|rdca|ouml|osol|Oscr|rdsh|yacy|real|oscr|xvee|andd|rect|andv|Xscr|oror|ordm|ordf|xscr|ange|aopf|Aopf|rHar|Xopf|opar|Oopf|xopf|xnis|rhov|oopf|omid|xmap|oint|apid|apos|ogon|ascr|Ascr|odot|odiv|xcup|xcap|ocir|oast|nvlt|nvle|nvgt|nvge|nvap|Wscr|wscr|auml|ntlg|ntgl|nsup|nsub|nsim|Nscr|nscr|nsce|Wopf|ring|npre|wopf|npar|Auml|Barv|bbrk|Nopf|nopf|nmid|nLtv|beta|ropf|Ropf|Beta|beth|nles|rpar|nleq|bnot|bNot|nldr|NJcy|rscr|Rscr|Vscr|vscr|rsqb|njcy|bopf|nisd|Bopf|rtri|Vopf|nGtv|ngtr|vopf|boxh|boxH|boxv|nges|ngeq|boxV|bscr|scap|Bscr|bsim|Vert|vert|bsol|bull|bump|caps|cdot|ncup|scnE|ncap|nbsp|napE|Cdot|cent|sdot|Vbar|nang|vBar|chcy|Mscr|mscr|sect|semi|CHcy|Mopf|mopf|sext|circ|cire|mldr|mlcp|cirE|comp|shcy|SHcy|vArr|varr|cong|copf|Copf|copy|COPY|malt|male|macr|lvnE|cscr|ltri|sime|ltcc|simg|Cscr|siml|csub|Uuml|lsqb|lsim|uuml|csup|Lscr|lscr|utri|smid|lpar|cups|smte|lozf|darr|Lopf|Uscr|solb|lopf|sopf|Sopf|lneq|uscr|spar|dArr|lnap|Darr|dash|Sqrt|LJcy|ljcy|lHar|dHar|Upsi|upsi|diam|lesg|djcy|DJcy|leqq|dopf|Dopf|dscr|Dscr|dscy|ldsh|ldca|squf|DScy|sscr|Sscr|dsol|lcub|late|star|Star|Uopf|Larr|lArr|larr|uopf|dtri|dzcy|sube|subE|Lang|lang|Kscr|kscr|Kopf|kopf|KJcy|kjcy|KHcy|khcy|DZcy|ecir|edot|eDot|Jscr|jscr|succ|Jopf|jopf|Edot|uHar|emsp|ensp|Iuml|iuml|eopf|isin|Iscr|iscr|Eopf|epar|sung|epsi|escr|sup1|sup2|sup3|Iota|iota|supe|supE|Iopf|iopf|IOcy|iocy|Escr|esim|Esim|imof|Uarr|QUOT|uArr|uarr|euml|IEcy|iecy|Idot|Euml|euro|excl|Hscr|hscr|Hopf|hopf|TScy|tscy|Tscr|hbar|tscr|flat|tbrk|fnof|hArr|harr|half|fopf|Fopf|tdot|gvnE|fork|trie|gtcc|fscr|Fscr|gdot|gsim|Gscr|gscr|Gopf|gopf|gneq|Gdot|tosa|gnap|Topf|topf|geqq|toea|GJcy|gjcy|tint|gesl|mid|Sfr|ggg|top|ges|gla|glE|glj|geq|gne|gEl|gel|gnE|Gcy|gcy|gap|Tfr|tfr|Tcy|tcy|Hat|Tau|Ffr|tau|Tab|hfr|Hfr|ffr|Fcy|fcy|icy|Icy|iff|ETH|eth|ifr|Ifr|Eta|eta|int|Int|Sup|sup|ucy|Ucy|Sum|sum|jcy|ENG|ufr|Ufr|eng|Jcy|jfr|els|ell|egs|Efr|efr|Jfr|uml|kcy|Kcy|Ecy|ecy|kfr|Kfr|lap|Sub|sub|lat|lcy|Lcy|leg|Dot|dot|lEg|leq|les|squ|div|die|lfr|Lfr|lgE|Dfr|dfr|Del|deg|Dcy|dcy|lne|lnE|sol|loz|smt|Cup|lrm|cup|lsh|Lsh|sim|shy|map|Map|mcy|Mcy|mfr|Mfr|mho|gfr|Gfr|sfr|cir|Chi|chi|nap|Cfr|vcy|Vcy|cfr|Scy|scy|ncy|Ncy|vee|Vee|Cap|cap|nfr|scE|sce|Nfr|nge|ngE|nGg|vfr|Vfr|ngt|bot|nGt|nis|niv|Rsh|rsh|nle|nlE|bne|Bfr|bfr|nLl|nlt|nLt|Bcy|bcy|not|Not|rlm|wfr|Wfr|npr|nsc|num|ocy|ast|Ocy|ofr|xfr|Xfr|Ofr|ogt|ohm|apE|olt|Rho|ape|rho|Rfr|rfr|ord|REG|ang|reg|orv|And|and|AMP|Rcy|amp|Afr|ycy|Ycy|yen|yfr|Yfr|rcy|par|pcy|Pcy|pfr|Pfr|phi|Phi|afr|Acy|acy|zcy|Zcy|piv|acE|acd|zfr|Zfr|pre|prE|psi|Psi|qfr|Qfr|zwj|Or|ge|Gg|gt|gg|el|oS|lt|Lt|LT|Re|lg|gl|eg|ne|Im|it|le|DD|wp|wr|nu|Nu|dd|lE|Sc|sc|pi|Pi|ee|af|ll|Ll|rx|gE|xi|pm|Xi|ic|pr|Pr|in|ni|mp|mu|ac|Mu|or|ap|Gt|GT|ii);|&(Aacute|Agrave|Atilde|Ccedil|Eacute|Egrave|Iacute|Igrave|Ntilde|Oacute|Ograve|Oslash|Otilde|Uacute|Ugrave|Yacute|aacute|agrave|atilde|brvbar|ccedil|curren|divide|eacute|egrave|frac12|frac14|frac34|iacute|igrave|iquest|middot|ntilde|oacute|ograve|oslash|otilde|plusmn|uacute|ugrave|yacute|AElig|Acirc|Aring|Ecirc|Icirc|Ocirc|THORN|Ucirc|acirc|acute|aelig|aring|cedil|ecirc|icirc|iexcl|laquo|micro|ocirc|pound|raquo|szlig|thorn|times|ucirc|Auml|COPY|Euml|Iuml|Ouml|QUOT|Uuml|auml|cent|copy|euml|iuml|macr|nbsp|ordf|ordm|ouml|para|quot|sect|sup1|sup2|sup3|uuml|yuml|AMP|ETH|REG|amp|deg|eth|not|reg|shy|uml|yen|GT|LT|gt|lt)(?!;)([=a-zA-Z0-9]?)|&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+)/g;
    var decodeMap = { "aacute": "\xE1", "Aacute": "\xC1", "abreve": "\u0103", "Abreve": "\u0102", "ac": "\u223E", "acd": "\u223F", "acE": "\u223E\u0333", "acirc": "\xE2", "Acirc": "\xC2", "acute": "\xB4", "acy": "\u0430", "Acy": "\u0410", "aelig": "\xE6", "AElig": "\xC6", "af": "\u2061", "afr": "\u{1D51E}", "Afr": "\u{1D504}", "agrave": "\xE0", "Agrave": "\xC0", "alefsym": "\u2135", "aleph": "\u2135", "alpha": "\u03B1", "Alpha": "\u0391", "amacr": "\u0101", "Amacr": "\u0100", "amalg": "\u2A3F", "amp": "&", "AMP": "&", "and": "\u2227", "And": "\u2A53", "andand": "\u2A55", "andd": "\u2A5C", "andslope": "\u2A58", "andv": "\u2A5A", "ang": "\u2220", "ange": "\u29A4", "angle": "\u2220", "angmsd": "\u2221", "angmsdaa": "\u29A8", "angmsdab": "\u29A9", "angmsdac": "\u29AA", "angmsdad": "\u29AB", "angmsdae": "\u29AC", "angmsdaf": "\u29AD", "angmsdag": "\u29AE", "angmsdah": "\u29AF", "angrt": "\u221F", "angrtvb": "\u22BE", "angrtvbd": "\u299D", "angsph": "\u2222", "angst": "\xC5", "angzarr": "\u237C", "aogon": "\u0105", "Aogon": "\u0104", "aopf": "\u{1D552}", "Aopf": "\u{1D538}", "ap": "\u2248", "apacir": "\u2A6F", "ape": "\u224A", "apE": "\u2A70", "apid": "\u224B", "apos": "'", "ApplyFunction": "\u2061", "approx": "\u2248", "approxeq": "\u224A", "aring": "\xE5", "Aring": "\xC5", "ascr": "\u{1D4B6}", "Ascr": "\u{1D49C}", "Assign": "\u2254", "ast": "*", "asymp": "\u2248", "asympeq": "\u224D", "atilde": "\xE3", "Atilde": "\xC3", "auml": "\xE4", "Auml": "\xC4", "awconint": "\u2233", "awint": "\u2A11", "backcong": "\u224C", "backepsilon": "\u03F6", "backprime": "\u2035", "backsim": "\u223D", "backsimeq": "\u22CD", "Backslash": "\u2216", "Barv": "\u2AE7", "barvee": "\u22BD", "barwed": "\u2305", "Barwed": "\u2306", "barwedge": "\u2305", "bbrk": "\u23B5", "bbrktbrk": "\u23B6", "bcong": "\u224C", "bcy": "\u0431", "Bcy": "\u0411", "bdquo": "\u201E", "becaus": "\u2235", "because": "\u2235", "Because": "\u2235", "bemptyv": "\u29B0", "bepsi": "\u03F6", "bernou": "\u212C", "Bernoullis": "\u212C", "beta": "\u03B2", "Beta": "\u0392", "beth": "\u2136", "between": "\u226C", "bfr": "\u{1D51F}", "Bfr": "\u{1D505}", "bigcap": "\u22C2", "bigcirc": "\u25EF", "bigcup": "\u22C3", "bigodot": "\u2A00", "bigoplus": "\u2A01", "bigotimes": "\u2A02", "bigsqcup": "\u2A06", "bigstar": "\u2605", "bigtriangledown": "\u25BD", "bigtriangleup": "\u25B3", "biguplus": "\u2A04", "bigvee": "\u22C1", "bigwedge": "\u22C0", "bkarow": "\u290D", "blacklozenge": "\u29EB", "blacksquare": "\u25AA", "blacktriangle": "\u25B4", "blacktriangledown": "\u25BE", "blacktriangleleft": "\u25C2", "blacktriangleright": "\u25B8", "blank": "\u2423", "blk12": "\u2592", "blk14": "\u2591", "blk34": "\u2593", "block": "\u2588", "bne": "=\u20E5", "bnequiv": "\u2261\u20E5", "bnot": "\u2310", "bNot": "\u2AED", "bopf": "\u{1D553}", "Bopf": "\u{1D539}", "bot": "\u22A5", "bottom": "\u22A5", "bowtie": "\u22C8", "boxbox": "\u29C9", "boxdl": "\u2510", "boxdL": "\u2555", "boxDl": "\u2556", "boxDL": "\u2557", "boxdr": "\u250C", "boxdR": "\u2552", "boxDr": "\u2553", "boxDR": "\u2554", "boxh": "\u2500", "boxH": "\u2550", "boxhd": "\u252C", "boxhD": "\u2565", "boxHd": "\u2564", "boxHD": "\u2566", "boxhu": "\u2534", "boxhU": "\u2568", "boxHu": "\u2567", "boxHU": "\u2569", "boxminus": "\u229F", "boxplus": "\u229E", "boxtimes": "\u22A0", "boxul": "\u2518", "boxuL": "\u255B", "boxUl": "\u255C", "boxUL": "\u255D", "boxur": "\u2514", "boxuR": "\u2558", "boxUr": "\u2559", "boxUR": "\u255A", "boxv": "\u2502", "boxV": "\u2551", "boxvh": "\u253C", "boxvH": "\u256A", "boxVh": "\u256B", "boxVH": "\u256C", "boxvl": "\u2524", "boxvL": "\u2561", "boxVl": "\u2562", "boxVL": "\u2563", "boxvr": "\u251C", "boxvR": "\u255E", "boxVr": "\u255F", "boxVR": "\u2560", "bprime": "\u2035", "breve": "\u02D8", "Breve": "\u02D8", "brvbar": "\xA6", "bscr": "\u{1D4B7}", "Bscr": "\u212C", "bsemi": "\u204F", "bsim": "\u223D", "bsime": "\u22CD", "bsol": "\\", "bsolb": "\u29C5", "bsolhsub": "\u27C8", "bull": "\u2022", "bullet": "\u2022", "bump": "\u224E", "bumpe": "\u224F", "bumpE": "\u2AAE", "bumpeq": "\u224F", "Bumpeq": "\u224E", "cacute": "\u0107", "Cacute": "\u0106", "cap": "\u2229", "Cap": "\u22D2", "capand": "\u2A44", "capbrcup": "\u2A49", "capcap": "\u2A4B", "capcup": "\u2A47", "capdot": "\u2A40", "CapitalDifferentialD": "\u2145", "caps": "\u2229\uFE00", "caret": "\u2041", "caron": "\u02C7", "Cayleys": "\u212D", "ccaps": "\u2A4D", "ccaron": "\u010D", "Ccaron": "\u010C", "ccedil": "\xE7", "Ccedil": "\xC7", "ccirc": "\u0109", "Ccirc": "\u0108", "Cconint": "\u2230", "ccups": "\u2A4C", "ccupssm": "\u2A50", "cdot": "\u010B", "Cdot": "\u010A", "cedil": "\xB8", "Cedilla": "\xB8", "cemptyv": "\u29B2", "cent": "\xA2", "centerdot": "\xB7", "CenterDot": "\xB7", "cfr": "\u{1D520}", "Cfr": "\u212D", "chcy": "\u0447", "CHcy": "\u0427", "check": "\u2713", "checkmark": "\u2713", "chi": "\u03C7", "Chi": "\u03A7", "cir": "\u25CB", "circ": "\u02C6", "circeq": "\u2257", "circlearrowleft": "\u21BA", "circlearrowright": "\u21BB", "circledast": "\u229B", "circledcirc": "\u229A", "circleddash": "\u229D", "CircleDot": "\u2299", "circledR": "\xAE", "circledS": "\u24C8", "CircleMinus": "\u2296", "CirclePlus": "\u2295", "CircleTimes": "\u2297", "cire": "\u2257", "cirE": "\u29C3", "cirfnint": "\u2A10", "cirmid": "\u2AEF", "cirscir": "\u29C2", "ClockwiseContourIntegral": "\u2232", "CloseCurlyDoubleQuote": "\u201D", "CloseCurlyQuote": "\u2019", "clubs": "\u2663", "clubsuit": "\u2663", "colon": ":", "Colon": "\u2237", "colone": "\u2254", "Colone": "\u2A74", "coloneq": "\u2254", "comma": ",", "commat": "@", "comp": "\u2201", "compfn": "\u2218", "complement": "\u2201", "complexes": "\u2102", "cong": "\u2245", "congdot": "\u2A6D", "Congruent": "\u2261", "conint": "\u222E", "Conint": "\u222F", "ContourIntegral": "\u222E", "copf": "\u{1D554}", "Copf": "\u2102", "coprod": "\u2210", "Coproduct": "\u2210", "copy": "\xA9", "COPY": "\xA9", "copysr": "\u2117", "CounterClockwiseContourIntegral": "\u2233", "crarr": "\u21B5", "cross": "\u2717", "Cross": "\u2A2F", "cscr": "\u{1D4B8}", "Cscr": "\u{1D49E}", "csub": "\u2ACF", "csube": "\u2AD1", "csup": "\u2AD0", "csupe": "\u2AD2", "ctdot": "\u22EF", "cudarrl": "\u2938", "cudarrr": "\u2935", "cuepr": "\u22DE", "cuesc": "\u22DF", "cularr": "\u21B6", "cularrp": "\u293D", "cup": "\u222A", "Cup": "\u22D3", "cupbrcap": "\u2A48", "cupcap": "\u2A46", "CupCap": "\u224D", "cupcup": "\u2A4A", "cupdot": "\u228D", "cupor": "\u2A45", "cups": "\u222A\uFE00", "curarr": "\u21B7", "curarrm": "\u293C", "curlyeqprec": "\u22DE", "curlyeqsucc": "\u22DF", "curlyvee": "\u22CE", "curlywedge": "\u22CF", "curren": "\xA4", "curvearrowleft": "\u21B6", "curvearrowright": "\u21B7", "cuvee": "\u22CE", "cuwed": "\u22CF", "cwconint": "\u2232", "cwint": "\u2231", "cylcty": "\u232D", "dagger": "\u2020", "Dagger": "\u2021", "daleth": "\u2138", "darr": "\u2193", "dArr": "\u21D3", "Darr": "\u21A1", "dash": "\u2010", "dashv": "\u22A3", "Dashv": "\u2AE4", "dbkarow": "\u290F", "dblac": "\u02DD", "dcaron": "\u010F", "Dcaron": "\u010E", "dcy": "\u0434", "Dcy": "\u0414", "dd": "\u2146", "DD": "\u2145", "ddagger": "\u2021", "ddarr": "\u21CA", "DDotrahd": "\u2911", "ddotseq": "\u2A77", "deg": "\xB0", "Del": "\u2207", "delta": "\u03B4", "Delta": "\u0394", "demptyv": "\u29B1", "dfisht": "\u297F", "dfr": "\u{1D521}", "Dfr": "\u{1D507}", "dHar": "\u2965", "dharl": "\u21C3", "dharr": "\u21C2", "DiacriticalAcute": "\xB4", "DiacriticalDot": "\u02D9", "DiacriticalDoubleAcute": "\u02DD", "DiacriticalGrave": "`", "DiacriticalTilde": "\u02DC", "diam": "\u22C4", "diamond": "\u22C4", "Diamond": "\u22C4", "diamondsuit": "\u2666", "diams": "\u2666", "die": "\xA8", "DifferentialD": "\u2146", "digamma": "\u03DD", "disin": "\u22F2", "div": "\xF7", "divide": "\xF7", "divideontimes": "\u22C7", "divonx": "\u22C7", "djcy": "\u0452", "DJcy": "\u0402", "dlcorn": "\u231E", "dlcrop": "\u230D", "dollar": "$", "dopf": "\u{1D555}", "Dopf": "\u{1D53B}", "dot": "\u02D9", "Dot": "\xA8", "DotDot": "\u20DC", "doteq": "\u2250", "doteqdot": "\u2251", "DotEqual": "\u2250", "dotminus": "\u2238", "dotplus": "\u2214", "dotsquare": "\u22A1", "doublebarwedge": "\u2306", "DoubleContourIntegral": "\u222F", "DoubleDot": "\xA8", "DoubleDownArrow": "\u21D3", "DoubleLeftArrow": "\u21D0", "DoubleLeftRightArrow": "\u21D4", "DoubleLeftTee": "\u2AE4", "DoubleLongLeftArrow": "\u27F8", "DoubleLongLeftRightArrow": "\u27FA", "DoubleLongRightArrow": "\u27F9", "DoubleRightArrow": "\u21D2", "DoubleRightTee": "\u22A8", "DoubleUpArrow": "\u21D1", "DoubleUpDownArrow": "\u21D5", "DoubleVerticalBar": "\u2225", "downarrow": "\u2193", "Downarrow": "\u21D3", "DownArrow": "\u2193", "DownArrowBar": "\u2913", "DownArrowUpArrow": "\u21F5", "DownBreve": "\u0311", "downdownarrows": "\u21CA", "downharpoonleft": "\u21C3", "downharpoonright": "\u21C2", "DownLeftRightVector": "\u2950", "DownLeftTeeVector": "\u295E", "DownLeftVector": "\u21BD", "DownLeftVectorBar": "\u2956", "DownRightTeeVector": "\u295F", "DownRightVector": "\u21C1", "DownRightVectorBar": "\u2957", "DownTee": "\u22A4", "DownTeeArrow": "\u21A7", "drbkarow": "\u2910", "drcorn": "\u231F", "drcrop": "\u230C", "dscr": "\u{1D4B9}", "Dscr": "\u{1D49F}", "dscy": "\u0455", "DScy": "\u0405", "dsol": "\u29F6", "dstrok": "\u0111", "Dstrok": "\u0110", "dtdot": "\u22F1", "dtri": "\u25BF", "dtrif": "\u25BE", "duarr": "\u21F5", "duhar": "\u296F", "dwangle": "\u29A6", "dzcy": "\u045F", "DZcy": "\u040F", "dzigrarr": "\u27FF", "eacute": "\xE9", "Eacute": "\xC9", "easter": "\u2A6E", "ecaron": "\u011B", "Ecaron": "\u011A", "ecir": "\u2256", "ecirc": "\xEA", "Ecirc": "\xCA", "ecolon": "\u2255", "ecy": "\u044D", "Ecy": "\u042D", "eDDot": "\u2A77", "edot": "\u0117", "eDot": "\u2251", "Edot": "\u0116", "ee": "\u2147", "efDot": "\u2252", "efr": "\u{1D522}", "Efr": "\u{1D508}", "eg": "\u2A9A", "egrave": "\xE8", "Egrave": "\xC8", "egs": "\u2A96", "egsdot": "\u2A98", "el": "\u2A99", "Element": "\u2208", "elinters": "\u23E7", "ell": "\u2113", "els": "\u2A95", "elsdot": "\u2A97", "emacr": "\u0113", "Emacr": "\u0112", "empty": "\u2205", "emptyset": "\u2205", "EmptySmallSquare": "\u25FB", "emptyv": "\u2205", "EmptyVerySmallSquare": "\u25AB", "emsp": "\u2003", "emsp13": "\u2004", "emsp14": "\u2005", "eng": "\u014B", "ENG": "\u014A", "ensp": "\u2002", "eogon": "\u0119", "Eogon": "\u0118", "eopf": "\u{1D556}", "Eopf": "\u{1D53C}", "epar": "\u22D5", "eparsl": "\u29E3", "eplus": "\u2A71", "epsi": "\u03B5", "epsilon": "\u03B5", "Epsilon": "\u0395", "epsiv": "\u03F5", "eqcirc": "\u2256", "eqcolon": "\u2255", "eqsim": "\u2242", "eqslantgtr": "\u2A96", "eqslantless": "\u2A95", "Equal": "\u2A75", "equals": "=", "EqualTilde": "\u2242", "equest": "\u225F", "Equilibrium": "\u21CC", "equiv": "\u2261", "equivDD": "\u2A78", "eqvparsl": "\u29E5", "erarr": "\u2971", "erDot": "\u2253", "escr": "\u212F", "Escr": "\u2130", "esdot": "\u2250", "esim": "\u2242", "Esim": "\u2A73", "eta": "\u03B7", "Eta": "\u0397", "eth": "\xF0", "ETH": "\xD0", "euml": "\xEB", "Euml": "\xCB", "euro": "\u20AC", "excl": "!", "exist": "\u2203", "Exists": "\u2203", "expectation": "\u2130", "exponentiale": "\u2147", "ExponentialE": "\u2147", "fallingdotseq": "\u2252", "fcy": "\u0444", "Fcy": "\u0424", "female": "\u2640", "ffilig": "\uFB03", "fflig": "\uFB00", "ffllig": "\uFB04", "ffr": "\u{1D523}", "Ffr": "\u{1D509}", "filig": "\uFB01", "FilledSmallSquare": "\u25FC", "FilledVerySmallSquare": "\u25AA", "fjlig": "fj", "flat": "\u266D", "fllig": "\uFB02", "fltns": "\u25B1", "fnof": "\u0192", "fopf": "\u{1D557}", "Fopf": "\u{1D53D}", "forall": "\u2200", "ForAll": "\u2200", "fork": "\u22D4", "forkv": "\u2AD9", "Fouriertrf": "\u2131", "fpartint": "\u2A0D", "frac12": "\xBD", "frac13": "\u2153", "frac14": "\xBC", "frac15": "\u2155", "frac16": "\u2159", "frac18": "\u215B", "frac23": "\u2154", "frac25": "\u2156", "frac34": "\xBE", "frac35": "\u2157", "frac38": "\u215C", "frac45": "\u2158", "frac56": "\u215A", "frac58": "\u215D", "frac78": "\u215E", "frasl": "\u2044", "frown": "\u2322", "fscr": "\u{1D4BB}", "Fscr": "\u2131", "gacute": "\u01F5", "gamma": "\u03B3", "Gamma": "\u0393", "gammad": "\u03DD", "Gammad": "\u03DC", "gap": "\u2A86", "gbreve": "\u011F", "Gbreve": "\u011E", "Gcedil": "\u0122", "gcirc": "\u011D", "Gcirc": "\u011C", "gcy": "\u0433", "Gcy": "\u0413", "gdot": "\u0121", "Gdot": "\u0120", "ge": "\u2265", "gE": "\u2267", "gel": "\u22DB", "gEl": "\u2A8C", "geq": "\u2265", "geqq": "\u2267", "geqslant": "\u2A7E", "ges": "\u2A7E", "gescc": "\u2AA9", "gesdot": "\u2A80", "gesdoto": "\u2A82", "gesdotol": "\u2A84", "gesl": "\u22DB\uFE00", "gesles": "\u2A94", "gfr": "\u{1D524}", "Gfr": "\u{1D50A}", "gg": "\u226B", "Gg": "\u22D9", "ggg": "\u22D9", "gimel": "\u2137", "gjcy": "\u0453", "GJcy": "\u0403", "gl": "\u2277", "gla": "\u2AA5", "glE": "\u2A92", "glj": "\u2AA4", "gnap": "\u2A8A", "gnapprox": "\u2A8A", "gne": "\u2A88", "gnE": "\u2269", "gneq": "\u2A88", "gneqq": "\u2269", "gnsim": "\u22E7", "gopf": "\u{1D558}", "Gopf": "\u{1D53E}", "grave": "`", "GreaterEqual": "\u2265", "GreaterEqualLess": "\u22DB", "GreaterFullEqual": "\u2267", "GreaterGreater": "\u2AA2", "GreaterLess": "\u2277", "GreaterSlantEqual": "\u2A7E", "GreaterTilde": "\u2273", "gscr": "\u210A", "Gscr": "\u{1D4A2}", "gsim": "\u2273", "gsime": "\u2A8E", "gsiml": "\u2A90", "gt": ">", "Gt": "\u226B", "GT": ">", "gtcc": "\u2AA7", "gtcir": "\u2A7A", "gtdot": "\u22D7", "gtlPar": "\u2995", "gtquest": "\u2A7C", "gtrapprox": "\u2A86", "gtrarr": "\u2978", "gtrdot": "\u22D7", "gtreqless": "\u22DB", "gtreqqless": "\u2A8C", "gtrless": "\u2277", "gtrsim": "\u2273", "gvertneqq": "\u2269\uFE00", "gvnE": "\u2269\uFE00", "Hacek": "\u02C7", "hairsp": "\u200A", "half": "\xBD", "hamilt": "\u210B", "hardcy": "\u044A", "HARDcy": "\u042A", "harr": "\u2194", "hArr": "\u21D4", "harrcir": "\u2948", "harrw": "\u21AD", "Hat": "^", "hbar": "\u210F", "hcirc": "\u0125", "Hcirc": "\u0124", "hearts": "\u2665", "heartsuit": "\u2665", "hellip": "\u2026", "hercon": "\u22B9", "hfr": "\u{1D525}", "Hfr": "\u210C", "HilbertSpace": "\u210B", "hksearow": "\u2925", "hkswarow": "\u2926", "hoarr": "\u21FF", "homtht": "\u223B", "hookleftarrow": "\u21A9", "hookrightarrow": "\u21AA", "hopf": "\u{1D559}", "Hopf": "\u210D", "horbar": "\u2015", "HorizontalLine": "\u2500", "hscr": "\u{1D4BD}", "Hscr": "\u210B", "hslash": "\u210F", "hstrok": "\u0127", "Hstrok": "\u0126", "HumpDownHump": "\u224E", "HumpEqual": "\u224F", "hybull": "\u2043", "hyphen": "\u2010", "iacute": "\xED", "Iacute": "\xCD", "ic": "\u2063", "icirc": "\xEE", "Icirc": "\xCE", "icy": "\u0438", "Icy": "\u0418", "Idot": "\u0130", "iecy": "\u0435", "IEcy": "\u0415", "iexcl": "\xA1", "iff": "\u21D4", "ifr": "\u{1D526}", "Ifr": "\u2111", "igrave": "\xEC", "Igrave": "\xCC", "ii": "\u2148", "iiiint": "\u2A0C", "iiint": "\u222D", "iinfin": "\u29DC", "iiota": "\u2129", "ijlig": "\u0133", "IJlig": "\u0132", "Im": "\u2111", "imacr": "\u012B", "Imacr": "\u012A", "image": "\u2111", "ImaginaryI": "\u2148", "imagline": "\u2110", "imagpart": "\u2111", "imath": "\u0131", "imof": "\u22B7", "imped": "\u01B5", "Implies": "\u21D2", "in": "\u2208", "incare": "\u2105", "infin": "\u221E", "infintie": "\u29DD", "inodot": "\u0131", "int": "\u222B", "Int": "\u222C", "intcal": "\u22BA", "integers": "\u2124", "Integral": "\u222B", "intercal": "\u22BA", "Intersection": "\u22C2", "intlarhk": "\u2A17", "intprod": "\u2A3C", "InvisibleComma": "\u2063", "InvisibleTimes": "\u2062", "iocy": "\u0451", "IOcy": "\u0401", "iogon": "\u012F", "Iogon": "\u012E", "iopf": "\u{1D55A}", "Iopf": "\u{1D540}", "iota": "\u03B9", "Iota": "\u0399", "iprod": "\u2A3C", "iquest": "\xBF", "iscr": "\u{1D4BE}", "Iscr": "\u2110", "isin": "\u2208", "isindot": "\u22F5", "isinE": "\u22F9", "isins": "\u22F4", "isinsv": "\u22F3", "isinv": "\u2208", "it": "\u2062", "itilde": "\u0129", "Itilde": "\u0128", "iukcy": "\u0456", "Iukcy": "\u0406", "iuml": "\xEF", "Iuml": "\xCF", "jcirc": "\u0135", "Jcirc": "\u0134", "jcy": "\u0439", "Jcy": "\u0419", "jfr": "\u{1D527}", "Jfr": "\u{1D50D}", "jmath": "\u0237", "jopf": "\u{1D55B}", "Jopf": "\u{1D541}", "jscr": "\u{1D4BF}", "Jscr": "\u{1D4A5}", "jsercy": "\u0458", "Jsercy": "\u0408", "jukcy": "\u0454", "Jukcy": "\u0404", "kappa": "\u03BA", "Kappa": "\u039A", "kappav": "\u03F0", "kcedil": "\u0137", "Kcedil": "\u0136", "kcy": "\u043A", "Kcy": "\u041A", "kfr": "\u{1D528}", "Kfr": "\u{1D50E}", "kgreen": "\u0138", "khcy": "\u0445", "KHcy": "\u0425", "kjcy": "\u045C", "KJcy": "\u040C", "kopf": "\u{1D55C}", "Kopf": "\u{1D542}", "kscr": "\u{1D4C0}", "Kscr": "\u{1D4A6}", "lAarr": "\u21DA", "lacute": "\u013A", "Lacute": "\u0139", "laemptyv": "\u29B4", "lagran": "\u2112", "lambda": "\u03BB", "Lambda": "\u039B", "lang": "\u27E8", "Lang": "\u27EA", "langd": "\u2991", "langle": "\u27E8", "lap": "\u2A85", "Laplacetrf": "\u2112", "laquo": "\xAB", "larr": "\u2190", "lArr": "\u21D0", "Larr": "\u219E", "larrb": "\u21E4", "larrbfs": "\u291F", "larrfs": "\u291D", "larrhk": "\u21A9", "larrlp": "\u21AB", "larrpl": "\u2939", "larrsim": "\u2973", "larrtl": "\u21A2", "lat": "\u2AAB", "latail": "\u2919", "lAtail": "\u291B", "late": "\u2AAD", "lates": "\u2AAD\uFE00", "lbarr": "\u290C", "lBarr": "\u290E", "lbbrk": "\u2772", "lbrace": "{", "lbrack": "[", "lbrke": "\u298B", "lbrksld": "\u298F", "lbrkslu": "\u298D", "lcaron": "\u013E", "Lcaron": "\u013D", "lcedil": "\u013C", "Lcedil": "\u013B", "lceil": "\u2308", "lcub": "{", "lcy": "\u043B", "Lcy": "\u041B", "ldca": "\u2936", "ldquo": "\u201C", "ldquor": "\u201E", "ldrdhar": "\u2967", "ldrushar": "\u294B", "ldsh": "\u21B2", "le": "\u2264", "lE": "\u2266", "LeftAngleBracket": "\u27E8", "leftarrow": "\u2190", "Leftarrow": "\u21D0", "LeftArrow": "\u2190", "LeftArrowBar": "\u21E4", "LeftArrowRightArrow": "\u21C6", "leftarrowtail": "\u21A2", "LeftCeiling": "\u2308", "LeftDoubleBracket": "\u27E6", "LeftDownTeeVector": "\u2961", "LeftDownVector": "\u21C3", "LeftDownVectorBar": "\u2959", "LeftFloor": "\u230A", "leftharpoondown": "\u21BD", "leftharpoonup": "\u21BC", "leftleftarrows": "\u21C7", "leftrightarrow": "\u2194", "Leftrightarrow": "\u21D4", "LeftRightArrow": "\u2194", "leftrightarrows": "\u21C6", "leftrightharpoons": "\u21CB", "leftrightsquigarrow": "\u21AD", "LeftRightVector": "\u294E", "LeftTee": "\u22A3", "LeftTeeArrow": "\u21A4", "LeftTeeVector": "\u295A", "leftthreetimes": "\u22CB", "LeftTriangle": "\u22B2", "LeftTriangleBar": "\u29CF", "LeftTriangleEqual": "\u22B4", "LeftUpDownVector": "\u2951", "LeftUpTeeVector": "\u2960", "LeftUpVector": "\u21BF", "LeftUpVectorBar": "\u2958", "LeftVector": "\u21BC", "LeftVectorBar": "\u2952", "leg": "\u22DA", "lEg": "\u2A8B", "leq": "\u2264", "leqq": "\u2266", "leqslant": "\u2A7D", "les": "\u2A7D", "lescc": "\u2AA8", "lesdot": "\u2A7F", "lesdoto": "\u2A81", "lesdotor": "\u2A83", "lesg": "\u22DA\uFE00", "lesges": "\u2A93", "lessapprox": "\u2A85", "lessdot": "\u22D6", "lesseqgtr": "\u22DA", "lesseqqgtr": "\u2A8B", "LessEqualGreater": "\u22DA", "LessFullEqual": "\u2266", "LessGreater": "\u2276", "lessgtr": "\u2276", "LessLess": "\u2AA1", "lesssim": "\u2272", "LessSlantEqual": "\u2A7D", "LessTilde": "\u2272", "lfisht": "\u297C", "lfloor": "\u230A", "lfr": "\u{1D529}", "Lfr": "\u{1D50F}", "lg": "\u2276", "lgE": "\u2A91", "lHar": "\u2962", "lhard": "\u21BD", "lharu": "\u21BC", "lharul": "\u296A", "lhblk": "\u2584", "ljcy": "\u0459", "LJcy": "\u0409", "ll": "\u226A", "Ll": "\u22D8", "llarr": "\u21C7", "llcorner": "\u231E", "Lleftarrow": "\u21DA", "llhard": "\u296B", "lltri": "\u25FA", "lmidot": "\u0140", "Lmidot": "\u013F", "lmoust": "\u23B0", "lmoustache": "\u23B0", "lnap": "\u2A89", "lnapprox": "\u2A89", "lne": "\u2A87", "lnE": "\u2268", "lneq": "\u2A87", "lneqq": "\u2268", "lnsim": "\u22E6", "loang": "\u27EC", "loarr": "\u21FD", "lobrk": "\u27E6", "longleftarrow": "\u27F5", "Longleftarrow": "\u27F8", "LongLeftArrow": "\u27F5", "longleftrightarrow": "\u27F7", "Longleftrightarrow": "\u27FA", "LongLeftRightArrow": "\u27F7", "longmapsto": "\u27FC", "longrightarrow": "\u27F6", "Longrightarrow": "\u27F9", "LongRightArrow": "\u27F6", "looparrowleft": "\u21AB", "looparrowright": "\u21AC", "lopar": "\u2985", "lopf": "\u{1D55D}", "Lopf": "\u{1D543}", "loplus": "\u2A2D", "lotimes": "\u2A34", "lowast": "\u2217", "lowbar": "_", "LowerLeftArrow": "\u2199", "LowerRightArrow": "\u2198", "loz": "\u25CA", "lozenge": "\u25CA", "lozf": "\u29EB", "lpar": "(", "lparlt": "\u2993", "lrarr": "\u21C6", "lrcorner": "\u231F", "lrhar": "\u21CB", "lrhard": "\u296D", "lrm": "\u200E", "lrtri": "\u22BF", "lsaquo": "\u2039", "lscr": "\u{1D4C1}", "Lscr": "\u2112", "lsh": "\u21B0", "Lsh": "\u21B0", "lsim": "\u2272", "lsime": "\u2A8D", "lsimg": "\u2A8F", "lsqb": "[", "lsquo": "\u2018", "lsquor": "\u201A", "lstrok": "\u0142", "Lstrok": "\u0141", "lt": "<", "Lt": "\u226A", "LT": "<", "ltcc": "\u2AA6", "ltcir": "\u2A79", "ltdot": "\u22D6", "lthree": "\u22CB", "ltimes": "\u22C9", "ltlarr": "\u2976", "ltquest": "\u2A7B", "ltri": "\u25C3", "ltrie": "\u22B4", "ltrif": "\u25C2", "ltrPar": "\u2996", "lurdshar": "\u294A", "luruhar": "\u2966", "lvertneqq": "\u2268\uFE00", "lvnE": "\u2268\uFE00", "macr": "\xAF", "male": "\u2642", "malt": "\u2720", "maltese": "\u2720", "map": "\u21A6", "Map": "\u2905", "mapsto": "\u21A6", "mapstodown": "\u21A7", "mapstoleft": "\u21A4", "mapstoup": "\u21A5", "marker": "\u25AE", "mcomma": "\u2A29", "mcy": "\u043C", "Mcy": "\u041C", "mdash": "\u2014", "mDDot": "\u223A", "measuredangle": "\u2221", "MediumSpace": "\u205F", "Mellintrf": "\u2133", "mfr": "\u{1D52A}", "Mfr": "\u{1D510}", "mho": "\u2127", "micro": "\xB5", "mid": "\u2223", "midast": "*", "midcir": "\u2AF0", "middot": "\xB7", "minus": "\u2212", "minusb": "\u229F", "minusd": "\u2238", "minusdu": "\u2A2A", "MinusPlus": "\u2213", "mlcp": "\u2ADB", "mldr": "\u2026", "mnplus": "\u2213", "models": "\u22A7", "mopf": "\u{1D55E}", "Mopf": "\u{1D544}", "mp": "\u2213", "mscr": "\u{1D4C2}", "Mscr": "\u2133", "mstpos": "\u223E", "mu": "\u03BC", "Mu": "\u039C", "multimap": "\u22B8", "mumap": "\u22B8", "nabla": "\u2207", "nacute": "\u0144", "Nacute": "\u0143", "nang": "\u2220\u20D2", "nap": "\u2249", "napE": "\u2A70\u0338", "napid": "\u224B\u0338", "napos": "\u0149", "napprox": "\u2249", "natur": "\u266E", "natural": "\u266E", "naturals": "\u2115", "nbsp": "\xA0", "nbump": "\u224E\u0338", "nbumpe": "\u224F\u0338", "ncap": "\u2A43", "ncaron": "\u0148", "Ncaron": "\u0147", "ncedil": "\u0146", "Ncedil": "\u0145", "ncong": "\u2247", "ncongdot": "\u2A6D\u0338", "ncup": "\u2A42", "ncy": "\u043D", "Ncy": "\u041D", "ndash": "\u2013", "ne": "\u2260", "nearhk": "\u2924", "nearr": "\u2197", "neArr": "\u21D7", "nearrow": "\u2197", "nedot": "\u2250\u0338", "NegativeMediumSpace": "\u200B", "NegativeThickSpace": "\u200B", "NegativeThinSpace": "\u200B", "NegativeVeryThinSpace": "\u200B", "nequiv": "\u2262", "nesear": "\u2928", "nesim": "\u2242\u0338", "NestedGreaterGreater": "\u226B", "NestedLessLess": "\u226A", "NewLine": "\n", "nexist": "\u2204", "nexists": "\u2204", "nfr": "\u{1D52B}", "Nfr": "\u{1D511}", "nge": "\u2271", "ngE": "\u2267\u0338", "ngeq": "\u2271", "ngeqq": "\u2267\u0338", "ngeqslant": "\u2A7E\u0338", "nges": "\u2A7E\u0338", "nGg": "\u22D9\u0338", "ngsim": "\u2275", "ngt": "\u226F", "nGt": "\u226B\u20D2", "ngtr": "\u226F", "nGtv": "\u226B\u0338", "nharr": "\u21AE", "nhArr": "\u21CE", "nhpar": "\u2AF2", "ni": "\u220B", "nis": "\u22FC", "nisd": "\u22FA", "niv": "\u220B", "njcy": "\u045A", "NJcy": "\u040A", "nlarr": "\u219A", "nlArr": "\u21CD", "nldr": "\u2025", "nle": "\u2270", "nlE": "\u2266\u0338", "nleftarrow": "\u219A", "nLeftarrow": "\u21CD", "nleftrightarrow": "\u21AE", "nLeftrightarrow": "\u21CE", "nleq": "\u2270", "nleqq": "\u2266\u0338", "nleqslant": "\u2A7D\u0338", "nles": "\u2A7D\u0338", "nless": "\u226E", "nLl": "\u22D8\u0338", "nlsim": "\u2274", "nlt": "\u226E", "nLt": "\u226A\u20D2", "nltri": "\u22EA", "nltrie": "\u22EC", "nLtv": "\u226A\u0338", "nmid": "\u2224", "NoBreak": "\u2060", "NonBreakingSpace": "\xA0", "nopf": "\u{1D55F}", "Nopf": "\u2115", "not": "\xAC", "Not": "\u2AEC", "NotCongruent": "\u2262", "NotCupCap": "\u226D", "NotDoubleVerticalBar": "\u2226", "NotElement": "\u2209", "NotEqual": "\u2260", "NotEqualTilde": "\u2242\u0338", "NotExists": "\u2204", "NotGreater": "\u226F", "NotGreaterEqual": "\u2271", "NotGreaterFullEqual": "\u2267\u0338", "NotGreaterGreater": "\u226B\u0338", "NotGreaterLess": "\u2279", "NotGreaterSlantEqual": "\u2A7E\u0338", "NotGreaterTilde": "\u2275", "NotHumpDownHump": "\u224E\u0338", "NotHumpEqual": "\u224F\u0338", "notin": "\u2209", "notindot": "\u22F5\u0338", "notinE": "\u22F9\u0338", "notinva": "\u2209", "notinvb": "\u22F7", "notinvc": "\u22F6", "NotLeftTriangle": "\u22EA", "NotLeftTriangleBar": "\u29CF\u0338", "NotLeftTriangleEqual": "\u22EC", "NotLess": "\u226E", "NotLessEqual": "\u2270", "NotLessGreater": "\u2278", "NotLessLess": "\u226A\u0338", "NotLessSlantEqual": "\u2A7D\u0338", "NotLessTilde": "\u2274", "NotNestedGreaterGreater": "\u2AA2\u0338", "NotNestedLessLess": "\u2AA1\u0338", "notni": "\u220C", "notniva": "\u220C", "notnivb": "\u22FE", "notnivc": "\u22FD", "NotPrecedes": "\u2280", "NotPrecedesEqual": "\u2AAF\u0338", "NotPrecedesSlantEqual": "\u22E0", "NotReverseElement": "\u220C", "NotRightTriangle": "\u22EB", "NotRightTriangleBar": "\u29D0\u0338", "NotRightTriangleEqual": "\u22ED", "NotSquareSubset": "\u228F\u0338", "NotSquareSubsetEqual": "\u22E2", "NotSquareSuperset": "\u2290\u0338", "NotSquareSupersetEqual": "\u22E3", "NotSubset": "\u2282\u20D2", "NotSubsetEqual": "\u2288", "NotSucceeds": "\u2281", "NotSucceedsEqual": "\u2AB0\u0338", "NotSucceedsSlantEqual": "\u22E1", "NotSucceedsTilde": "\u227F\u0338", "NotSuperset": "\u2283\u20D2", "NotSupersetEqual": "\u2289", "NotTilde": "\u2241", "NotTildeEqual": "\u2244", "NotTildeFullEqual": "\u2247", "NotTildeTilde": "\u2249", "NotVerticalBar": "\u2224", "npar": "\u2226", "nparallel": "\u2226", "nparsl": "\u2AFD\u20E5", "npart": "\u2202\u0338", "npolint": "\u2A14", "npr": "\u2280", "nprcue": "\u22E0", "npre": "\u2AAF\u0338", "nprec": "\u2280", "npreceq": "\u2AAF\u0338", "nrarr": "\u219B", "nrArr": "\u21CF", "nrarrc": "\u2933\u0338", "nrarrw": "\u219D\u0338", "nrightarrow": "\u219B", "nRightarrow": "\u21CF", "nrtri": "\u22EB", "nrtrie": "\u22ED", "nsc": "\u2281", "nsccue": "\u22E1", "nsce": "\u2AB0\u0338", "nscr": "\u{1D4C3}", "Nscr": "\u{1D4A9}", "nshortmid": "\u2224", "nshortparallel": "\u2226", "nsim": "\u2241", "nsime": "\u2244", "nsimeq": "\u2244", "nsmid": "\u2224", "nspar": "\u2226", "nsqsube": "\u22E2", "nsqsupe": "\u22E3", "nsub": "\u2284", "nsube": "\u2288", "nsubE": "\u2AC5\u0338", "nsubset": "\u2282\u20D2", "nsubseteq": "\u2288", "nsubseteqq": "\u2AC5\u0338", "nsucc": "\u2281", "nsucceq": "\u2AB0\u0338", "nsup": "\u2285", "nsupe": "\u2289", "nsupE": "\u2AC6\u0338", "nsupset": "\u2283\u20D2", "nsupseteq": "\u2289", "nsupseteqq": "\u2AC6\u0338", "ntgl": "\u2279", "ntilde": "\xF1", "Ntilde": "\xD1", "ntlg": "\u2278", "ntriangleleft": "\u22EA", "ntrianglelefteq": "\u22EC", "ntriangleright": "\u22EB", "ntrianglerighteq": "\u22ED", "nu": "\u03BD", "Nu": "\u039D", "num": "#", "numero": "\u2116", "numsp": "\u2007", "nvap": "\u224D\u20D2", "nvdash": "\u22AC", "nvDash": "\u22AD", "nVdash": "\u22AE", "nVDash": "\u22AF", "nvge": "\u2265\u20D2", "nvgt": ">\u20D2", "nvHarr": "\u2904", "nvinfin": "\u29DE", "nvlArr": "\u2902", "nvle": "\u2264\u20D2", "nvlt": "<\u20D2", "nvltrie": "\u22B4\u20D2", "nvrArr": "\u2903", "nvrtrie": "\u22B5\u20D2", "nvsim": "\u223C\u20D2", "nwarhk": "\u2923", "nwarr": "\u2196", "nwArr": "\u21D6", "nwarrow": "\u2196", "nwnear": "\u2927", "oacute": "\xF3", "Oacute": "\xD3", "oast": "\u229B", "ocir": "\u229A", "ocirc": "\xF4", "Ocirc": "\xD4", "ocy": "\u043E", "Ocy": "\u041E", "odash": "\u229D", "odblac": "\u0151", "Odblac": "\u0150", "odiv": "\u2A38", "odot": "\u2299", "odsold": "\u29BC", "oelig": "\u0153", "OElig": "\u0152", "ofcir": "\u29BF", "ofr": "\u{1D52C}", "Ofr": "\u{1D512}", "ogon": "\u02DB", "ograve": "\xF2", "Ograve": "\xD2", "ogt": "\u29C1", "ohbar": "\u29B5", "ohm": "\u03A9", "oint": "\u222E", "olarr": "\u21BA", "olcir": "\u29BE", "olcross": "\u29BB", "oline": "\u203E", "olt": "\u29C0", "omacr": "\u014D", "Omacr": "\u014C", "omega": "\u03C9", "Omega": "\u03A9", "omicron": "\u03BF", "Omicron": "\u039F", "omid": "\u29B6", "ominus": "\u2296", "oopf": "\u{1D560}", "Oopf": "\u{1D546}", "opar": "\u29B7", "OpenCurlyDoubleQuote": "\u201C", "OpenCurlyQuote": "\u2018", "operp": "\u29B9", "oplus": "\u2295", "or": "\u2228", "Or": "\u2A54", "orarr": "\u21BB", "ord": "\u2A5D", "order": "\u2134", "orderof": "\u2134", "ordf": "\xAA", "ordm": "\xBA", "origof": "\u22B6", "oror": "\u2A56", "orslope": "\u2A57", "orv": "\u2A5B", "oS": "\u24C8", "oscr": "\u2134", "Oscr": "\u{1D4AA}", "oslash": "\xF8", "Oslash": "\xD8", "osol": "\u2298", "otilde": "\xF5", "Otilde": "\xD5", "otimes": "\u2297", "Otimes": "\u2A37", "otimesas": "\u2A36", "ouml": "\xF6", "Ouml": "\xD6", "ovbar": "\u233D", "OverBar": "\u203E", "OverBrace": "\u23DE", "OverBracket": "\u23B4", "OverParenthesis": "\u23DC", "par": "\u2225", "para": "\xB6", "parallel": "\u2225", "parsim": "\u2AF3", "parsl": "\u2AFD", "part": "\u2202", "PartialD": "\u2202", "pcy": "\u043F", "Pcy": "\u041F", "percnt": "%", "period": ".", "permil": "\u2030", "perp": "\u22A5", "pertenk": "\u2031", "pfr": "\u{1D52D}", "Pfr": "\u{1D513}", "phi": "\u03C6", "Phi": "\u03A6", "phiv": "\u03D5", "phmmat": "\u2133", "phone": "\u260E", "pi": "\u03C0", "Pi": "\u03A0", "pitchfork": "\u22D4", "piv": "\u03D6", "planck": "\u210F", "planckh": "\u210E", "plankv": "\u210F", "plus": "+", "plusacir": "\u2A23", "plusb": "\u229E", "pluscir": "\u2A22", "plusdo": "\u2214", "plusdu": "\u2A25", "pluse": "\u2A72", "PlusMinus": "\xB1", "plusmn": "\xB1", "plussim": "\u2A26", "plustwo": "\u2A27", "pm": "\xB1", "Poincareplane": "\u210C", "pointint": "\u2A15", "popf": "\u{1D561}", "Popf": "\u2119", "pound": "\xA3", "pr": "\u227A", "Pr": "\u2ABB", "prap": "\u2AB7", "prcue": "\u227C", "pre": "\u2AAF", "prE": "\u2AB3", "prec": "\u227A", "precapprox": "\u2AB7", "preccurlyeq": "\u227C", "Precedes": "\u227A", "PrecedesEqual": "\u2AAF", "PrecedesSlantEqual": "\u227C", "PrecedesTilde": "\u227E", "preceq": "\u2AAF", "precnapprox": "\u2AB9", "precneqq": "\u2AB5", "precnsim": "\u22E8", "precsim": "\u227E", "prime": "\u2032", "Prime": "\u2033", "primes": "\u2119", "prnap": "\u2AB9", "prnE": "\u2AB5", "prnsim": "\u22E8", "prod": "\u220F", "Product": "\u220F", "profalar": "\u232E", "profline": "\u2312", "profsurf": "\u2313", "prop": "\u221D", "Proportion": "\u2237", "Proportional": "\u221D", "propto": "\u221D", "prsim": "\u227E", "prurel": "\u22B0", "pscr": "\u{1D4C5}", "Pscr": "\u{1D4AB}", "psi": "\u03C8", "Psi": "\u03A8", "puncsp": "\u2008", "qfr": "\u{1D52E}", "Qfr": "\u{1D514}", "qint": "\u2A0C", "qopf": "\u{1D562}", "Qopf": "\u211A", "qprime": "\u2057", "qscr": "\u{1D4C6}", "Qscr": "\u{1D4AC}", "quaternions": "\u210D", "quatint": "\u2A16", "quest": "?", "questeq": "\u225F", "quot": '"', "QUOT": '"', "rAarr": "\u21DB", "race": "\u223D\u0331", "racute": "\u0155", "Racute": "\u0154", "radic": "\u221A", "raemptyv": "\u29B3", "rang": "\u27E9", "Rang": "\u27EB", "rangd": "\u2992", "range": "\u29A5", "rangle": "\u27E9", "raquo": "\xBB", "rarr": "\u2192", "rArr": "\u21D2", "Rarr": "\u21A0", "rarrap": "\u2975", "rarrb": "\u21E5", "rarrbfs": "\u2920", "rarrc": "\u2933", "rarrfs": "\u291E", "rarrhk": "\u21AA", "rarrlp": "\u21AC", "rarrpl": "\u2945", "rarrsim": "\u2974", "rarrtl": "\u21A3", "Rarrtl": "\u2916", "rarrw": "\u219D", "ratail": "\u291A", "rAtail": "\u291C", "ratio": "\u2236", "rationals": "\u211A", "rbarr": "\u290D", "rBarr": "\u290F", "RBarr": "\u2910", "rbbrk": "\u2773", "rbrace": "}", "rbrack": "]", "rbrke": "\u298C", "rbrksld": "\u298E", "rbrkslu": "\u2990", "rcaron": "\u0159", "Rcaron": "\u0158", "rcedil": "\u0157", "Rcedil": "\u0156", "rceil": "\u2309", "rcub": "}", "rcy": "\u0440", "Rcy": "\u0420", "rdca": "\u2937", "rdldhar": "\u2969", "rdquo": "\u201D", "rdquor": "\u201D", "rdsh": "\u21B3", "Re": "\u211C", "real": "\u211C", "realine": "\u211B", "realpart": "\u211C", "reals": "\u211D", "rect": "\u25AD", "reg": "\xAE", "REG": "\xAE", "ReverseElement": "\u220B", "ReverseEquilibrium": "\u21CB", "ReverseUpEquilibrium": "\u296F", "rfisht": "\u297D", "rfloor": "\u230B", "rfr": "\u{1D52F}", "Rfr": "\u211C", "rHar": "\u2964", "rhard": "\u21C1", "rharu": "\u21C0", "rharul": "\u296C", "rho": "\u03C1", "Rho": "\u03A1", "rhov": "\u03F1", "RightAngleBracket": "\u27E9", "rightarrow": "\u2192", "Rightarrow": "\u21D2", "RightArrow": "\u2192", "RightArrowBar": "\u21E5", "RightArrowLeftArrow": "\u21C4", "rightarrowtail": "\u21A3", "RightCeiling": "\u2309", "RightDoubleBracket": "\u27E7", "RightDownTeeVector": "\u295D", "RightDownVector": "\u21C2", "RightDownVectorBar": "\u2955", "RightFloor": "\u230B", "rightharpoondown": "\u21C1", "rightharpoonup": "\u21C0", "rightleftarrows": "\u21C4", "rightleftharpoons": "\u21CC", "rightrightarrows": "\u21C9", "rightsquigarrow": "\u219D", "RightTee": "\u22A2", "RightTeeArrow": "\u21A6", "RightTeeVector": "\u295B", "rightthreetimes": "\u22CC", "RightTriangle": "\u22B3", "RightTriangleBar": "\u29D0", "RightTriangleEqual": "\u22B5", "RightUpDownVector": "\u294F", "RightUpTeeVector": "\u295C", "RightUpVector": "\u21BE", "RightUpVectorBar": "\u2954", "RightVector": "\u21C0", "RightVectorBar": "\u2953", "ring": "\u02DA", "risingdotseq": "\u2253", "rlarr": "\u21C4", "rlhar": "\u21CC", "rlm": "\u200F", "rmoust": "\u23B1", "rmoustache": "\u23B1", "rnmid": "\u2AEE", "roang": "\u27ED", "roarr": "\u21FE", "robrk": "\u27E7", "ropar": "\u2986", "ropf": "\u{1D563}", "Ropf": "\u211D", "roplus": "\u2A2E", "rotimes": "\u2A35", "RoundImplies": "\u2970", "rpar": ")", "rpargt": "\u2994", "rppolint": "\u2A12", "rrarr": "\u21C9", "Rrightarrow": "\u21DB", "rsaquo": "\u203A", "rscr": "\u{1D4C7}", "Rscr": "\u211B", "rsh": "\u21B1", "Rsh": "\u21B1", "rsqb": "]", "rsquo": "\u2019", "rsquor": "\u2019", "rthree": "\u22CC", "rtimes": "\u22CA", "rtri": "\u25B9", "rtrie": "\u22B5", "rtrif": "\u25B8", "rtriltri": "\u29CE", "RuleDelayed": "\u29F4", "ruluhar": "\u2968", "rx": "\u211E", "sacute": "\u015B", "Sacute": "\u015A", "sbquo": "\u201A", "sc": "\u227B", "Sc": "\u2ABC", "scap": "\u2AB8", "scaron": "\u0161", "Scaron": "\u0160", "sccue": "\u227D", "sce": "\u2AB0", "scE": "\u2AB4", "scedil": "\u015F", "Scedil": "\u015E", "scirc": "\u015D", "Scirc": "\u015C", "scnap": "\u2ABA", "scnE": "\u2AB6", "scnsim": "\u22E9", "scpolint": "\u2A13", "scsim": "\u227F", "scy": "\u0441", "Scy": "\u0421", "sdot": "\u22C5", "sdotb": "\u22A1", "sdote": "\u2A66", "searhk": "\u2925", "searr": "\u2198", "seArr": "\u21D8", "searrow": "\u2198", "sect": "\xA7", "semi": ";", "seswar": "\u2929", "setminus": "\u2216", "setmn": "\u2216", "sext": "\u2736", "sfr": "\u{1D530}", "Sfr": "\u{1D516}", "sfrown": "\u2322", "sharp": "\u266F", "shchcy": "\u0449", "SHCHcy": "\u0429", "shcy": "\u0448", "SHcy": "\u0428", "ShortDownArrow": "\u2193", "ShortLeftArrow": "\u2190", "shortmid": "\u2223", "shortparallel": "\u2225", "ShortRightArrow": "\u2192", "ShortUpArrow": "\u2191", "shy": "\xAD", "sigma": "\u03C3", "Sigma": "\u03A3", "sigmaf": "\u03C2", "sigmav": "\u03C2", "sim": "\u223C", "simdot": "\u2A6A", "sime": "\u2243", "simeq": "\u2243", "simg": "\u2A9E", "simgE": "\u2AA0", "siml": "\u2A9D", "simlE": "\u2A9F", "simne": "\u2246", "simplus": "\u2A24", "simrarr": "\u2972", "slarr": "\u2190", "SmallCircle": "\u2218", "smallsetminus": "\u2216", "smashp": "\u2A33", "smeparsl": "\u29E4", "smid": "\u2223", "smile": "\u2323", "smt": "\u2AAA", "smte": "\u2AAC", "smtes": "\u2AAC\uFE00", "softcy": "\u044C", "SOFTcy": "\u042C", "sol": "/", "solb": "\u29C4", "solbar": "\u233F", "sopf": "\u{1D564}", "Sopf": "\u{1D54A}", "spades": "\u2660", "spadesuit": "\u2660", "spar": "\u2225", "sqcap": "\u2293", "sqcaps": "\u2293\uFE00", "sqcup": "\u2294", "sqcups": "\u2294\uFE00", "Sqrt": "\u221A", "sqsub": "\u228F", "sqsube": "\u2291", "sqsubset": "\u228F", "sqsubseteq": "\u2291", "sqsup": "\u2290", "sqsupe": "\u2292", "sqsupset": "\u2290", "sqsupseteq": "\u2292", "squ": "\u25A1", "square": "\u25A1", "Square": "\u25A1", "SquareIntersection": "\u2293", "SquareSubset": "\u228F", "SquareSubsetEqual": "\u2291", "SquareSuperset": "\u2290", "SquareSupersetEqual": "\u2292", "SquareUnion": "\u2294", "squarf": "\u25AA", "squf": "\u25AA", "srarr": "\u2192", "sscr": "\u{1D4C8}", "Sscr": "\u{1D4AE}", "ssetmn": "\u2216", "ssmile": "\u2323", "sstarf": "\u22C6", "star": "\u2606", "Star": "\u22C6", "starf": "\u2605", "straightepsilon": "\u03F5", "straightphi": "\u03D5", "strns": "\xAF", "sub": "\u2282", "Sub": "\u22D0", "subdot": "\u2ABD", "sube": "\u2286", "subE": "\u2AC5", "subedot": "\u2AC3", "submult": "\u2AC1", "subne": "\u228A", "subnE": "\u2ACB", "subplus": "\u2ABF", "subrarr": "\u2979", "subset": "\u2282", "Subset": "\u22D0", "subseteq": "\u2286", "subseteqq": "\u2AC5", "SubsetEqual": "\u2286", "subsetneq": "\u228A", "subsetneqq": "\u2ACB", "subsim": "\u2AC7", "subsub": "\u2AD5", "subsup": "\u2AD3", "succ": "\u227B", "succapprox": "\u2AB8", "succcurlyeq": "\u227D", "Succeeds": "\u227B", "SucceedsEqual": "\u2AB0", "SucceedsSlantEqual": "\u227D", "SucceedsTilde": "\u227F", "succeq": "\u2AB0", "succnapprox": "\u2ABA", "succneqq": "\u2AB6", "succnsim": "\u22E9", "succsim": "\u227F", "SuchThat": "\u220B", "sum": "\u2211", "Sum": "\u2211", "sung": "\u266A", "sup": "\u2283", "Sup": "\u22D1", "sup1": "\xB9", "sup2": "\xB2", "sup3": "\xB3", "supdot": "\u2ABE", "supdsub": "\u2AD8", "supe": "\u2287", "supE": "\u2AC6", "supedot": "\u2AC4", "Superset": "\u2283", "SupersetEqual": "\u2287", "suphsol": "\u27C9", "suphsub": "\u2AD7", "suplarr": "\u297B", "supmult": "\u2AC2", "supne": "\u228B", "supnE": "\u2ACC", "supplus": "\u2AC0", "supset": "\u2283", "Supset": "\u22D1", "supseteq": "\u2287", "supseteqq": "\u2AC6", "supsetneq": "\u228B", "supsetneqq": "\u2ACC", "supsim": "\u2AC8", "supsub": "\u2AD4", "supsup": "\u2AD6", "swarhk": "\u2926", "swarr": "\u2199", "swArr": "\u21D9", "swarrow": "\u2199", "swnwar": "\u292A", "szlig": "\xDF", "Tab": "	", "target": "\u2316", "tau": "\u03C4", "Tau": "\u03A4", "tbrk": "\u23B4", "tcaron": "\u0165", "Tcaron": "\u0164", "tcedil": "\u0163", "Tcedil": "\u0162", "tcy": "\u0442", "Tcy": "\u0422", "tdot": "\u20DB", "telrec": "\u2315", "tfr": "\u{1D531}", "Tfr": "\u{1D517}", "there4": "\u2234", "therefore": "\u2234", "Therefore": "\u2234", "theta": "\u03B8", "Theta": "\u0398", "thetasym": "\u03D1", "thetav": "\u03D1", "thickapprox": "\u2248", "thicksim": "\u223C", "ThickSpace": "\u205F\u200A", "thinsp": "\u2009", "ThinSpace": "\u2009", "thkap": "\u2248", "thksim": "\u223C", "thorn": "\xFE", "THORN": "\xDE", "tilde": "\u02DC", "Tilde": "\u223C", "TildeEqual": "\u2243", "TildeFullEqual": "\u2245", "TildeTilde": "\u2248", "times": "\xD7", "timesb": "\u22A0", "timesbar": "\u2A31", "timesd": "\u2A30", "tint": "\u222D", "toea": "\u2928", "top": "\u22A4", "topbot": "\u2336", "topcir": "\u2AF1", "topf": "\u{1D565}", "Topf": "\u{1D54B}", "topfork": "\u2ADA", "tosa": "\u2929", "tprime": "\u2034", "trade": "\u2122", "TRADE": "\u2122", "triangle": "\u25B5", "triangledown": "\u25BF", "triangleleft": "\u25C3", "trianglelefteq": "\u22B4", "triangleq": "\u225C", "triangleright": "\u25B9", "trianglerighteq": "\u22B5", "tridot": "\u25EC", "trie": "\u225C", "triminus": "\u2A3A", "TripleDot": "\u20DB", "triplus": "\u2A39", "trisb": "\u29CD", "tritime": "\u2A3B", "trpezium": "\u23E2", "tscr": "\u{1D4C9}", "Tscr": "\u{1D4AF}", "tscy": "\u0446", "TScy": "\u0426", "tshcy": "\u045B", "TSHcy": "\u040B", "tstrok": "\u0167", "Tstrok": "\u0166", "twixt": "\u226C", "twoheadleftarrow": "\u219E", "twoheadrightarrow": "\u21A0", "uacute": "\xFA", "Uacute": "\xDA", "uarr": "\u2191", "uArr": "\u21D1", "Uarr": "\u219F", "Uarrocir": "\u2949", "ubrcy": "\u045E", "Ubrcy": "\u040E", "ubreve": "\u016D", "Ubreve": "\u016C", "ucirc": "\xFB", "Ucirc": "\xDB", "ucy": "\u0443", "Ucy": "\u0423", "udarr": "\u21C5", "udblac": "\u0171", "Udblac": "\u0170", "udhar": "\u296E", "ufisht": "\u297E", "ufr": "\u{1D532}", "Ufr": "\u{1D518}", "ugrave": "\xF9", "Ugrave": "\xD9", "uHar": "\u2963", "uharl": "\u21BF", "uharr": "\u21BE", "uhblk": "\u2580", "ulcorn": "\u231C", "ulcorner": "\u231C", "ulcrop": "\u230F", "ultri": "\u25F8", "umacr": "\u016B", "Umacr": "\u016A", "uml": "\xA8", "UnderBar": "_", "UnderBrace": "\u23DF", "UnderBracket": "\u23B5", "UnderParenthesis": "\u23DD", "Union": "\u22C3", "UnionPlus": "\u228E", "uogon": "\u0173", "Uogon": "\u0172", "uopf": "\u{1D566}", "Uopf": "\u{1D54C}", "uparrow": "\u2191", "Uparrow": "\u21D1", "UpArrow": "\u2191", "UpArrowBar": "\u2912", "UpArrowDownArrow": "\u21C5", "updownarrow": "\u2195", "Updownarrow": "\u21D5", "UpDownArrow": "\u2195", "UpEquilibrium": "\u296E", "upharpoonleft": "\u21BF", "upharpoonright": "\u21BE", "uplus": "\u228E", "UpperLeftArrow": "\u2196", "UpperRightArrow": "\u2197", "upsi": "\u03C5", "Upsi": "\u03D2", "upsih": "\u03D2", "upsilon": "\u03C5", "Upsilon": "\u03A5", "UpTee": "\u22A5", "UpTeeArrow": "\u21A5", "upuparrows": "\u21C8", "urcorn": "\u231D", "urcorner": "\u231D", "urcrop": "\u230E", "uring": "\u016F", "Uring": "\u016E", "urtri": "\u25F9", "uscr": "\u{1D4CA}", "Uscr": "\u{1D4B0}", "utdot": "\u22F0", "utilde": "\u0169", "Utilde": "\u0168", "utri": "\u25B5", "utrif": "\u25B4", "uuarr": "\u21C8", "uuml": "\xFC", "Uuml": "\xDC", "uwangle": "\u29A7", "vangrt": "\u299C", "varepsilon": "\u03F5", "varkappa": "\u03F0", "varnothing": "\u2205", "varphi": "\u03D5", "varpi": "\u03D6", "varpropto": "\u221D", "varr": "\u2195", "vArr": "\u21D5", "varrho": "\u03F1", "varsigma": "\u03C2", "varsubsetneq": "\u228A\uFE00", "varsubsetneqq": "\u2ACB\uFE00", "varsupsetneq": "\u228B\uFE00", "varsupsetneqq": "\u2ACC\uFE00", "vartheta": "\u03D1", "vartriangleleft": "\u22B2", "vartriangleright": "\u22B3", "vBar": "\u2AE8", "Vbar": "\u2AEB", "vBarv": "\u2AE9", "vcy": "\u0432", "Vcy": "\u0412", "vdash": "\u22A2", "vDash": "\u22A8", "Vdash": "\u22A9", "VDash": "\u22AB", "Vdashl": "\u2AE6", "vee": "\u2228", "Vee": "\u22C1", "veebar": "\u22BB", "veeeq": "\u225A", "vellip": "\u22EE", "verbar": "|", "Verbar": "\u2016", "vert": "|", "Vert": "\u2016", "VerticalBar": "\u2223", "VerticalLine": "|", "VerticalSeparator": "\u2758", "VerticalTilde": "\u2240", "VeryThinSpace": "\u200A", "vfr": "\u{1D533}", "Vfr": "\u{1D519}", "vltri": "\u22B2", "vnsub": "\u2282\u20D2", "vnsup": "\u2283\u20D2", "vopf": "\u{1D567}", "Vopf": "\u{1D54D}", "vprop": "\u221D", "vrtri": "\u22B3", "vscr": "\u{1D4CB}", "Vscr": "\u{1D4B1}", "vsubne": "\u228A\uFE00", "vsubnE": "\u2ACB\uFE00", "vsupne": "\u228B\uFE00", "vsupnE": "\u2ACC\uFE00", "Vvdash": "\u22AA", "vzigzag": "\u299A", "wcirc": "\u0175", "Wcirc": "\u0174", "wedbar": "\u2A5F", "wedge": "\u2227", "Wedge": "\u22C0", "wedgeq": "\u2259", "weierp": "\u2118", "wfr": "\u{1D534}", "Wfr": "\u{1D51A}", "wopf": "\u{1D568}", "Wopf": "\u{1D54E}", "wp": "\u2118", "wr": "\u2240", "wreath": "\u2240", "wscr": "\u{1D4CC}", "Wscr": "\u{1D4B2}", "xcap": "\u22C2", "xcirc": "\u25EF", "xcup": "\u22C3", "xdtri": "\u25BD", "xfr": "\u{1D535}", "Xfr": "\u{1D51B}", "xharr": "\u27F7", "xhArr": "\u27FA", "xi": "\u03BE", "Xi": "\u039E", "xlarr": "\u27F5", "xlArr": "\u27F8", "xmap": "\u27FC", "xnis": "\u22FB", "xodot": "\u2A00", "xopf": "\u{1D569}", "Xopf": "\u{1D54F}", "xoplus": "\u2A01", "xotime": "\u2A02", "xrarr": "\u27F6", "xrArr": "\u27F9", "xscr": "\u{1D4CD}", "Xscr": "\u{1D4B3}", "xsqcup": "\u2A06", "xuplus": "\u2A04", "xutri": "\u25B3", "xvee": "\u22C1", "xwedge": "\u22C0", "yacute": "\xFD", "Yacute": "\xDD", "yacy": "\u044F", "YAcy": "\u042F", "ycirc": "\u0177", "Ycirc": "\u0176", "ycy": "\u044B", "Ycy": "\u042B", "yen": "\xA5", "yfr": "\u{1D536}", "Yfr": "\u{1D51C}", "yicy": "\u0457", "YIcy": "\u0407", "yopf": "\u{1D56A}", "Yopf": "\u{1D550}", "yscr": "\u{1D4CE}", "Yscr": "\u{1D4B4}", "yucy": "\u044E", "YUcy": "\u042E", "yuml": "\xFF", "Yuml": "\u0178", "zacute": "\u017A", "Zacute": "\u0179", "zcaron": "\u017E", "Zcaron": "\u017D", "zcy": "\u0437", "Zcy": "\u0417", "zdot": "\u017C", "Zdot": "\u017B", "zeetrf": "\u2128", "ZeroWidthSpace": "\u200B", "zeta": "\u03B6", "Zeta": "\u0396", "zfr": "\u{1D537}", "Zfr": "\u2128", "zhcy": "\u0436", "ZHcy": "\u0416", "zigrarr": "\u21DD", "zopf": "\u{1D56B}", "Zopf": "\u2124", "zscr": "\u{1D4CF}", "Zscr": "\u{1D4B5}", "zwj": "\u200D", "zwnj": "\u200C" };
    var decodeMapLegacy = { "aacute": "\xE1", "Aacute": "\xC1", "acirc": "\xE2", "Acirc": "\xC2", "acute": "\xB4", "aelig": "\xE6", "AElig": "\xC6", "agrave": "\xE0", "Agrave": "\xC0", "amp": "&", "AMP": "&", "aring": "\xE5", "Aring": "\xC5", "atilde": "\xE3", "Atilde": "\xC3", "auml": "\xE4", "Auml": "\xC4", "brvbar": "\xA6", "ccedil": "\xE7", "Ccedil": "\xC7", "cedil": "\xB8", "cent": "\xA2", "copy": "\xA9", "COPY": "\xA9", "curren": "\xA4", "deg": "\xB0", "divide": "\xF7", "eacute": "\xE9", "Eacute": "\xC9", "ecirc": "\xEA", "Ecirc": "\xCA", "egrave": "\xE8", "Egrave": "\xC8", "eth": "\xF0", "ETH": "\xD0", "euml": "\xEB", "Euml": "\xCB", "frac12": "\xBD", "frac14": "\xBC", "frac34": "\xBE", "gt": ">", "GT": ">", "iacute": "\xED", "Iacute": "\xCD", "icirc": "\xEE", "Icirc": "\xCE", "iexcl": "\xA1", "igrave": "\xEC", "Igrave": "\xCC", "iquest": "\xBF", "iuml": "\xEF", "Iuml": "\xCF", "laquo": "\xAB", "lt": "<", "LT": "<", "macr": "\xAF", "micro": "\xB5", "middot": "\xB7", "nbsp": "\xA0", "not": "\xAC", "ntilde": "\xF1", "Ntilde": "\xD1", "oacute": "\xF3", "Oacute": "\xD3", "ocirc": "\xF4", "Ocirc": "\xD4", "ograve": "\xF2", "Ograve": "\xD2", "ordf": "\xAA", "ordm": "\xBA", "oslash": "\xF8", "Oslash": "\xD8", "otilde": "\xF5", "Otilde": "\xD5", "ouml": "\xF6", "Ouml": "\xD6", "para": "\xB6", "plusmn": "\xB1", "pound": "\xA3", "quot": '"', "QUOT": '"', "raquo": "\xBB", "reg": "\xAE", "REG": "\xAE", "sect": "\xA7", "shy": "\xAD", "sup1": "\xB9", "sup2": "\xB2", "sup3": "\xB3", "szlig": "\xDF", "thorn": "\xFE", "THORN": "\xDE", "times": "\xD7", "uacute": "\xFA", "Uacute": "\xDA", "ucirc": "\xFB", "Ucirc": "\xDB", "ugrave": "\xF9", "Ugrave": "\xD9", "uml": "\xA8", "uuml": "\xFC", "Uuml": "\xDC", "yacute": "\xFD", "Yacute": "\xDD", "yen": "\xA5", "yuml": "\xFF" };
    var decodeMapNumeric = { "0": "\uFFFD", "128": "\u20AC", "130": "\u201A", "131": "\u0192", "132": "\u201E", "133": "\u2026", "134": "\u2020", "135": "\u2021", "136": "\u02C6", "137": "\u2030", "138": "\u0160", "139": "\u2039", "140": "\u0152", "142": "\u017D", "145": "\u2018", "146": "\u2019", "147": "\u201C", "148": "\u201D", "149": "\u2022", "150": "\u2013", "151": "\u2014", "152": "\u02DC", "153": "\u2122", "154": "\u0161", "155": "\u203A", "156": "\u0153", "158": "\u017E", "159": "\u0178" };
    var invalidReferenceCodePoints = [1, 2, 3, 4, 5, 6, 7, 8, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 64976, 64977, 64978, 64979, 64980, 64981, 64982, 64983, 64984, 64985, 64986, 64987, 64988, 64989, 64990, 64991, 64992, 64993, 64994, 64995, 64996, 64997, 64998, 64999, 65e3, 65001, 65002, 65003, 65004, 65005, 65006, 65007, 65534, 65535, 131070, 131071, 196606, 196607, 262142, 262143, 327678, 327679, 393214, 393215, 458750, 458751, 524286, 524287, 589822, 589823, 655358, 655359, 720894, 720895, 786430, 786431, 851966, 851967, 917502, 917503, 983038, 983039, 1048574, 1048575, 1114110, 1114111];
    var stringFromCharCode = String.fromCharCode;
    var object = {};
    var hasOwnProperty = object.hasOwnProperty;
    var has = function(object2, propertyName) {
      return hasOwnProperty.call(object2, propertyName);
    };
    var contains = function(array, value) {
      var index2 = -1;
      var length = array.length;
      while (++index2 < length) {
        if (array[index2] == value) {
          return true;
        }
      }
      return false;
    };
    var merge2 = function(options2, defaults) {
      if (!options2) {
        return defaults;
      }
      var result = {};
      var key2;
      for (key2 in defaults) {
        result[key2] = has(options2, key2) ? options2[key2] : defaults[key2];
      }
      return result;
    };
    var codePointToSymbol = function(codePoint, strict) {
      var output2 = "";
      if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
        if (strict) {
          parseError("character reference outside the permissible Unicode range");
        }
        return "\uFFFD";
      }
      if (has(decodeMapNumeric, codePoint)) {
        if (strict) {
          parseError("disallowed character reference");
        }
        return decodeMapNumeric[codePoint];
      }
      if (strict && contains(invalidReferenceCodePoints, codePoint)) {
        parseError("disallowed character reference");
      }
      if (codePoint > 65535) {
        codePoint -= 65536;
        output2 += stringFromCharCode(codePoint >>> 10 & 1023 | 55296);
        codePoint = 56320 | codePoint & 1023;
      }
      output2 += stringFromCharCode(codePoint);
      return output2;
    };
    var hexEscape = function(codePoint) {
      return "&#x" + codePoint.toString(16).toUpperCase() + ";";
    };
    var decEscape = function(codePoint) {
      return "&#" + codePoint + ";";
    };
    var parseError = function(message) {
      throw Error("Parse error: " + message);
    };
    var encode = function(string, options2) {
      options2 = merge2(options2, encode.options);
      var strict = options2.strict;
      if (strict && regexInvalidRawCodePoint.test(string)) {
        parseError("forbidden code point");
      }
      var encodeEverything = options2.encodeEverything;
      var useNamedReferences = options2.useNamedReferences;
      var allowUnsafeSymbols = options2.allowUnsafeSymbols;
      var escapeCodePoint = options2.decimal ? decEscape : hexEscape;
      var escapeBmpSymbol = function(symbol) {
        return escapeCodePoint(symbol.charCodeAt(0));
      };
      if (encodeEverything) {
        string = string.replace(regexAsciiWhitelist, function(symbol) {
          if (useNamedReferences && has(encodeMap, symbol)) {
            return "&" + encodeMap[symbol] + ";";
          }
          return escapeBmpSymbol(symbol);
        });
        if (useNamedReferences) {
          string = string.replace(/&gt;\u20D2/g, "&nvgt;").replace(/&lt;\u20D2/g, "&nvlt;").replace(/&#x66;&#x6A;/g, "&fjlig;");
        }
        if (useNamedReferences) {
          string = string.replace(regexEncodeNonAscii, function(string2) {
            return "&" + encodeMap[string2] + ";";
          });
        }
      } else if (useNamedReferences) {
        if (!allowUnsafeSymbols) {
          string = string.replace(regexEscape, function(string2) {
            return "&" + encodeMap[string2] + ";";
          });
        }
        string = string.replace(/&gt;\u20D2/g, "&nvgt;").replace(/&lt;\u20D2/g, "&nvlt;");
        string = string.replace(regexEncodeNonAscii, function(string2) {
          return "&" + encodeMap[string2] + ";";
        });
      } else if (!allowUnsafeSymbols) {
        string = string.replace(regexEscape, escapeBmpSymbol);
      }
      return string.replace(regexAstralSymbols, function($0) {
        var high = $0.charCodeAt(0);
        var low = $0.charCodeAt(1);
        var codePoint = (high - 55296) * 1024 + low - 56320 + 65536;
        return escapeCodePoint(codePoint);
      }).replace(regexBmpWhitelist, escapeBmpSymbol);
    };
    encode.options = {
      "allowUnsafeSymbols": false,
      "encodeEverything": false,
      "strict": false,
      "useNamedReferences": false,
      "decimal": false
    };
    var decode = function(html2, options2) {
      options2 = merge2(options2, decode.options);
      var strict = options2.strict;
      if (strict && regexInvalidEntity.test(html2)) {
        parseError("malformed character reference");
      }
      return html2.replace(regexDecode, function($0, $1, $2, $3, $4, $5, $6, $7, $8) {
        var codePoint;
        var semicolon;
        var decDigits;
        var hexDigits;
        var reference;
        var next;
        if ($1) {
          reference = $1;
          return decodeMap[reference];
        }
        if ($2) {
          reference = $2;
          next = $3;
          if (next && options2.isAttributeValue) {
            if (strict && next == "=") {
              parseError("`&` did not start a character reference");
            }
            return $0;
          } else {
            if (strict) {
              parseError(
                "named character reference was not terminated by a semicolon"
              );
            }
            return decodeMapLegacy[reference] + (next || "");
          }
        }
        if ($4) {
          decDigits = $4;
          semicolon = $5;
          if (strict && !semicolon) {
            parseError("character reference was not terminated by a semicolon");
          }
          codePoint = parseInt(decDigits, 10);
          return codePointToSymbol(codePoint, strict);
        }
        if ($6) {
          hexDigits = $6;
          semicolon = $7;
          if (strict && !semicolon) {
            parseError("character reference was not terminated by a semicolon");
          }
          codePoint = parseInt(hexDigits, 16);
          return codePointToSymbol(codePoint, strict);
        }
        if (strict) {
          parseError(
            "named character reference was not terminated by a semicolon"
          );
        }
        return $0;
      });
    };
    decode.options = {
      "isAttributeValue": false,
      "strict": false
    };
    var escape = function(string) {
      return string.replace(regexEscape, function($0) {
        return escapeMap[$0];
      });
    };
    var he2 = {
      "version": "1.2.0",
      "encode": encode,
      "decode": decode,
      "escape": escape,
      "unescape": decode
    };
    if (freeExports && !freeExports.nodeType) {
      if (freeModule) {
        freeModule.exports = he2;
      } else {
        for (var key in he2) {
          has(he2, key) && (freeExports[key] = he2[key]);
        }
      }
    } else {
      root.he = he2;
    }
  })(commonjsGlobal);
})(he, he.exports);
const EmailRenderContext = React.createContext({});
const EmailRenderProvider = (props) => {
  return /* @__PURE__ */ React.createElement(EmailRenderContext.Provider, {
    value: props
  }, props.children);
};
function JsonToMjml(options2) {
  const { data, beautify } = options2;
  const block = BlockManager.getBlockByType(data.type);
  if (!block) {
    throw new Error(`Block ${data.type} not found`);
  }
  const mjmlString = he.exports.unescape(
    renderToStaticMarkup(
      /* @__PURE__ */ React.createElement(EmailRenderProvider, {
        dataSource: options2.dataSource,
        mode: options2.mode,
        context: options2.context
      }, block.render(options2))
    )
  );
  if (beautify) {
    return js.exports.html(mjmlString, { indent_size: 2 });
  }
  return mjmlString;
}
const useEmailRenderContext = () => {
  return useContext(EmailRenderContext);
};
const BlockRenderer = (props) => {
  const { data } = props;
  const { mode, context, dataSource } = useEmailRenderContext();
  if (data.data.hidden)
    return null;
  const block = BlockManager.getBlockByType(data.type);
  if (!block)
    return null;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, block.render(__spreadProps(__spreadValues({}, props), { mode, context, dataSource })));
};
function BasicBlock(props) {
  const {
    params,
    params: { data, idx, children: children2, mode },
    tag,
    children
  } = props;
  const placeholder = data.children.length === 0 && getPlaceholder(params);
  let content = children || children2;
  if ((!content || Array.isArray(content) && content.length === 0) && data.children.length === 0) {
    content = placeholder;
  }
  if (mode === "testing" && tag === "mj-image") {
    let url = data.attributes.src;
    if (url === "" || /{{([\s\S]+?)}}/g.test(url) || /\*\|([^\|\*]+)\|\*/g.test(url)) {
      const adapterData = omit(params, "data.attributes.src");
      return /* @__PURE__ */ React.createElement(React.Fragment, null, `<${tag} ${getAdapterAttributesString(adapterData)} src="${getImg(
        "IMAGE_59"
      )}">`, `</${tag}>`);
    }
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, `<${tag} ${getAdapterAttributesString(params)}>`, content || data.children.map((child, index2) => /* @__PURE__ */ React.createElement(BlockRenderer, __spreadProps(__spreadValues({
    key: index2
  }, params), {
    idx: idx ? getChildIdx(idx, index2) : null,
    data: child
  }))), `</${tag}>`);
}
const Wrapper$1 = createBlock({
  get name() {
    return t("Wrapper");
  },
  type: BasicType.WRAPPER,
  create: (payload) => {
    const defaultData = {
      type: BasicType.WRAPPER,
      data: {
        value: {}
      },
      attributes: {
        padding: "20px 0px 20px 0px",
        border: "none",
        direction: "ltr",
        "text-align": "center"
      },
      children: []
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.PAGE],
  render(params) {
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-wrapper"
    });
  }
});
function generaMjmlMetaData(data) {
  const values = data.data.value;
  const attributes = [
    "content-background-color",
    "text-color",
    "font-family",
    "font-size",
    "line-height",
    "font-weight",
    "user-style",
    "responsive"
  ];
  return `
    <mj-html-attributes>
      ${attributes.filter((key) => values[key] !== void 0).map((key) => {
    const attKey = key;
    const isMultipleAttributes = isObject(values[attKey]);
    const value = isMultipleAttributes ? Object.keys(values[attKey]).map((childKey) => {
      const childValue = values[attKey][childKey];
      return `${childKey}="${isString(childValue) ? childValue.replace(/"/gm, "") : childValue}"`;
    }).join(" ") : `${key}="${values[attKey]}"`;
    return `<mj-html-attribute class="easy-email" multiple-attributes="${isMultipleAttributes}" attribute-name="${key}" ${value}></mj-html-attribute>`;
  }).join("\n")}

    </mj-html-attributes>
  `;
}
class I18nManager {
  static setLocaleData(localeData) {
    this.localeData = localeData;
  }
  static translate(key, placeholder) {
    const translationValue = get(this.localeData, key, key);
    if (!placeholder) {
      return translationValue;
    }
    const arr = translationValue.split("***");
    arr.splice(1, 0, placeholder);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, arr.map((item, index2) => /* @__PURE__ */ React.createElement(React.Fragment, {
      key: index2
    }, item)));
  }
}
I18nManager.localeData = {};
const t = I18nManager.translate.bind(I18nManager);
const Page$1 = createBlock({
  get name() {
    return t("Page");
  },
  type: BasicType.PAGE,
  create: (payload) => {
    const defaultData = {
      type: BasicType.PAGE,
      data: {
        value: {
          breakpoint: "480px",
          headAttributes: "",
          "font-size": "14px",
          "font-weight": "400",
          "line-height": "1.7",
          headStyles: [],
          fonts: [],
          responsive: true,
          "font-family": "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans','Helvetica Neue', sans-serif",
          "text-color": "#000000"
        }
      },
      attributes: {
        "background-color": "#efeeea",
        width: "600px"
      },
      children: [Wrapper$1.create()]
    };
    return merge(defaultData, payload);
  },
  validParentType: [],
  render(params) {
    var _a, _b;
    const { data } = params;
    const metaData = generaMjmlMetaData(data);
    const value = data.data.value;
    const breakpoint = value.breakpoint ? `<mj-breakpoint width="${data.data.value.breakpoint}" />` : "";
    const nonResponsive = !value.responsive ? `<mj-raw>
            <meta name="viewport" />
           </mj-raw>
           <mj-style inline="inline">.mjml-body { width: ${data.attributes.width || "600px"}; margin: 0px auto; }</mj-style>` : "";
    const styles = ((_a = value.headStyles) == null ? void 0 : _a.map(
      (style) => `<mj-style ${style.inline ? 'inline="inline"' : ""}>${style.content}</mj-style>`
    ).join("\n")) || "";
    const userStyle = value["user-style"] ? `<mj-style ${value["user-style"].inline ? 'inline="inline"' : ""}>${value["user-style"].content}</mj-style>` : "";
    const extraHeadContent = value.extraHeadContent ? `<mj-raw>${value.extraHeadContent}</mj-raw>` : "";
    return /* @__PURE__ */ React.createElement(React.Fragment, null, `
          <mjml>
          <mj-head>
              ${metaData}
              ${nonResponsive}
              ${styles}
              ${userStyle}
              ${breakpoint}
              ${extraHeadContent}
              ${(_b = value.fonts) == null ? void 0 : _b.filter(Boolean).map((item) => `<mj-font name="${item.name}" href="${item.href}" />`)}
            <mj-attributes>
              ${value.headAttributes}
              ${value["font-family"] ? `<mj-all font-family="${value["font-family"].replace(/"/gm, "")}" />` : ""}
              ${value["font-size"] ? `<mj-text font-size="${value["font-size"]}" />` : ""}
              ${value["text-color"] ? `<mj-text color="${value["text-color"]}" />` : ""}
        ${value["line-height"] ? `<mj-text line-height="${value["line-height"]}" />` : ""}
        ${value["font-weight"] ? `<mj-text font-weight="${value["font-weight"]}" />` : ""}
              ${value["content-background-color"] ? `<mj-wrapper background-color="${value["content-background-color"]}" />
             <mj-section background-color="${value["content-background-color"]}" />
            ` : ""}

            </mj-attributes>
          </mj-head>
          <mj-body ${getAdapterAttributesString(params)}>`, data.children.map((child, index2) => /* @__PURE__ */ React.createElement(BlockRenderer, __spreadProps(__spreadValues({}, params), {
      idx: getChildIdx(getPageIdx(), index2),
      key: index2,
      data: child
    }))), "</mj-body></mjml > ");
  }
});
const Section$1 = createBlock({
  get name() {
    return t("Section");
  },
  type: BasicType.SECTION,
  create: (payload) => {
    const defaultData = {
      type: BasicType.SECTION,
      data: {
        value: {
          noWrap: false
        }
      },
      attributes: {
        padding: "20px 0px 20px 0px",
        "background-repeat": "repeat",
        "background-size": "auto",
        "background-position": "top center",
        border: "none",
        direction: "ltr",
        "text-align": "center"
      },
      children: []
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.PAGE, BasicType.WRAPPER],
  render(params) {
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-section"
    });
  }
});
const Column$1 = createBlock({
  get name() {
    return t("Column");
  },
  type: BasicType.COLUMN,
  create: (payload) => {
    const defaultData = {
      type: BasicType.COLUMN,
      data: {
        value: {}
      },
      attributes: {
        padding: "0px 0px 0px 0px",
        border: "none",
        "vertical-align": "top"
      },
      children: []
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.SECTION, BasicType.GROUP],
  render(params) {
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-column"
    });
  }
});
const Text$1 = createBlock({
  get name() {
    return t("Text");
  },
  type: BasicType.TEXT,
  create: (payload) => {
    const defaultData = {
      type: BasicType.TEXT,
      data: {
        value: {
          content: t("Make it easy for everyone to compose emails!")
        }
      },
      attributes: {
        padding: "10px 25px 10px 25px",
        align: "left"
      },
      children: []
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.COLUMN, BasicType.HERO],
  render(params) {
    const { data } = params;
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-text"
    }, data.data.value.content);
  }
});
const Image$1 = createBlock({
  get name() {
    return t("Image");
  },
  type: BasicType.IMAGE,
  create: (payload) => {
    const defaultData = {
      type: BasicType.IMAGE,
      data: {
        value: {}
      },
      attributes: {
        align: "center",
        height: "auto",
        padding: "10px 25px 10px 25px",
        src: ""
      },
      children: []
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.COLUMN, BasicType.HERO],
  render(params) {
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-image"
    });
  }
});
const Group$1 = createBlock({
  get name() {
    return t("Group");
  },
  type: BasicType.GROUP,
  create: (payload) => {
    const defaultData = {
      type: BasicType.GROUP,
      data: {
        value: {}
      },
      attributes: {
        "vertical-align": "top",
        direction: "ltr"
      },
      children: []
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.SECTION],
  render(params) {
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-group"
    });
  }
});
const Button$1 = createBlock({
  get name() {
    return t("Button");
  },
  type: BasicType.BUTTON,
  create: (payload) => {
    const defaultData = {
      type: BasicType.BUTTON,
      data: {
        value: {
          content: "Button"
        }
      },
      attributes: {
        align: "center",
        "background-color": "#414141",
        color: "#ffffff",
        "font-weight": "normal",
        "border-radius": "3px",
        padding: "10px 25px 10px 25px",
        "inner-padding": "10px 25px 10px 25px",
        "line-height": "120%",
        target: "_blank",
        "vertical-align": "middle",
        border: "none",
        "text-align": "center",
        href: "#"
      },
      children: []
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.COLUMN, BasicType.HERO],
  render(params) {
    const { data } = params;
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-button"
    }, data.data.value.content);
  }
});
const Divider$1 = createBlock({
  get name() {
    return t("Divider");
  },
  type: BasicType.DIVIDER,
  create: (payload) => {
    const defaultData = {
      type: BasicType.DIVIDER,
      data: {
        value: {}
      },
      attributes: {
        align: "center",
        "border-width": "1px",
        "border-style": "solid",
        "border-color": "#C9CCCF",
        padding: "10px 0px 10px 0px"
      },
      children: []
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.COLUMN, BasicType.HERO],
  render(params) {
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-divider"
    });
  }
});
const Spacer$1 = createBlock({
  get name() {
    return t("Spacer");
  },
  type: BasicType.SPACER,
  create: (payload) => {
    const defaultData = {
      type: BasicType.SPACER,
      data: {
        value: {}
      },
      attributes: {
        height: "20px"
      },
      children: []
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.COLUMN, BasicType.HERO],
  render(params) {
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-spacer"
    });
  }
});
function mergeBlock(a, b) {
  return mergeWith(a, b, (a2, b2) => isArray(b2) ? b2 : void 0);
}
const Carousel$1 = createBlock({
  get name() {
    return t("Carousel");
  },
  type: BasicType.CAROUSEL,
  create: (payload) => {
    const defaultData = {
      type: BasicType.CAROUSEL,
      data: {
        value: {
          images: [
            {
              src: getImg("IMAGE_15"),
              target: "_blank"
            },
            {
              src: getImg("IMAGE_16"),
              target: "_blank"
            },
            {
              src: getImg("IMAGE_17"),
              target: "_blank"
            }
          ]
        }
      },
      attributes: {
        align: "center",
        "left-icon": "https://i.imgur.com/xTh3hln.png",
        "right-icon": "https://i.imgur.com/os7o9kz.png",
        "icon-width": "44px",
        thumbnails: "visible"
      },
      children: []
    };
    return mergeBlock(defaultData, payload);
  },
  validParentType: [BasicType.COLUMN],
  render(params) {
    const { data } = params;
    const carouselImages = data.data.value.images.map((image) => {
      const imageAttributeStr = Object.keys(image).filter((key) => key !== "content" && image[key] !== "").map((key) => `${key}="${image[key]}"`).join(" ");
      return `
      <mj-carousel-image ${imageAttributeStr} />
      `;
    }).join("\n");
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-carousel"
    }, carouselImages);
  }
});
const Hero$1 = createBlock({
  get name() {
    return t("Hero");
  },
  type: BasicType.HERO,
  create: (payload) => {
    const defaultData = {
      type: BasicType.HERO,
      data: {
        value: {}
      },
      attributes: {
        "background-color": "#ffffff",
        "background-position": "center center",
        mode: "fluid-height",
        padding: "100px 0px 100px 0px",
        "vertical-align": "top",
        "background-url": getImg("IMAGE_31")
      },
      children: [
        {
          type: "text",
          data: {
            value: {
              content: "We Serve Healthy &amp; Delicious Foods"
            }
          },
          attributes: {
            padding: "10px 25px 10px 25px",
            align: "center",
            color: "#ffffff",
            "font-size": "45px",
            "line-height": "45px"
          },
          children: []
        },
        {
          type: "text",
          data: {
            value: {
              content: "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.<br>"
            }
          },
          attributes: {
            align: "center",
            "background-color": "#414141",
            color: "#ffffff",
            "font-weight": "normal",
            "border-radius": "3px",
            padding: "10px 25px 10px 25px",
            "inner-padding": "10px 25px 10px 25px",
            "line-height": "1.5",
            target: "_blank",
            "vertical-align": "middle",
            border: "none",
            "text-align": "center",
            href: "#",
            "font-size": "14px"
          },
          children: []
        },
        {
          type: "button",
          data: {
            value: {
              content: "Get Your Order Here!"
            }
          },
          attributes: {
            align: "center",
            "background-color": "#f3a333",
            color: "#ffffff",
            "font-size": "13px",
            "font-weight": "normal",
            "border-radius": "30px",
            padding: "10px 25px 10px 25px",
            "inner-padding": "10px 25px 10px 25px",
            "line-height": "120%",
            target: "_blank",
            "vertical-align": "middle",
            border: "none",
            "text-align": "center",
            href: "#"
          },
          children: []
        }
      ]
    };
    return mergeBlock(defaultData, payload);
  },
  validParentType: [BasicType.PAGE, BasicType.WRAPPER],
  render(params) {
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-hero"
    });
  }
});
const Navbar$1 = createBlock({
  get name() {
    return t("Navbar");
  },
  type: BasicType.NAVBAR,
  create: (payload) => {
    const defaultData = {
      type: BasicType.NAVBAR,
      data: {
        value: {
          links: [
            {
              href: "/gettings-started-onboard",
              content: "Getting started",
              color: "#1890ff",
              "font-size": "13px",
              target: "_blank",
              padding: "15px 10px"
            },
            {
              href: "/try-it-live",
              content: "Try it live",
              color: "#1890ff",
              "font-size": "13px",
              target: "_blank",
              padding: "15px 10px"
            },
            {
              href: "/templates",
              content: "Templates",
              color: "#1890ff",
              "font-size": "13px",
              target: "_blank",
              padding: "15px 10px"
            },
            {
              href: "/components",
              content: "Components",
              color: "#1890ff",
              "font-size": "13px",
              target: "_blank",
              padding: "15px 10px"
            }
          ]
        }
      },
      attributes: {
        align: "center"
      },
      children: []
    };
    return mergeBlock(defaultData, payload);
  },
  validParentType: [BasicType.COLUMN, BasicType.HERO],
  render(params) {
    const { data } = params;
    const links = data.data.value.links.map((link, index2) => {
      const linkAttributeStr = Object.keys(link).filter((key) => key !== "content" && link[key] !== "").map((key) => `${key}="${link[key]}"`).join(" ");
      return `
          <mj-navbar-link ${linkAttributeStr}>${link.content}</mj-navbar-link>
          `;
    }).join("\n");
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-navbar"
    }, links);
  }
});
const Social$1 = createBlock({
  get name() {
    return t("Social");
  },
  type: BasicType.SOCIAL,
  create: (payload) => {
    const defaultData = {
      type: BasicType.SOCIAL,
      data: {
        value: {
          elements: [
            {
              href: "#",
              target: "_blank",
              src: getImg("IMAGE_02"),
              content: "Facebook"
            },
            {
              href: "#",
              target: "_blank",
              src: getImg("IMAGE_03"),
              content: "Google"
            },
            {
              href: "",
              target: "_blank",
              src: getImg("IMAGE_04"),
              content: "Twitter"
            }
          ]
        }
      },
      attributes: {
        align: "center",
        color: "#333333",
        mode: "horizontal",
        "font-size": "13px",
        "font-weight": "normal",
        "border-radius": "3px",
        padding: "10px 25px 10px 25px",
        "inner-padding": "4px 4px 4px 4px",
        "line-height": "22px",
        "text-padding": "4px 4px 4px 0px",
        "icon-padding": "0px",
        "icon-size": "20px"
      },
      children: []
    };
    return mergeBlock(defaultData, payload);
  },
  validParentType: [BasicType.COLUMN],
  render(params) {
    const { data } = params;
    const elements = data.data.value.elements.map((element) => {
      var _a;
      const elementAttributeStr = Object.keys(element).filter((key) => key !== "content" && element[key] !== "").map((key) => `${key}="${element[key]}"`).join(" ");
      return `
          <mj-social-element ${elementAttributeStr}>${(_a = element.content) != null ? _a : ""}</mj-social-element>
          `;
    }).join("\n");
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-social"
    }, elements);
  }
});
const Raw$1 = createBlock({
  get name() {
    return t("Raw");
  },
  type: BasicType.RAW,
  create: (payload) => {
    const defaultData = {
      type: BasicType.RAW,
      data: {
        value: {
          content: "<% if (user) { %>"
        }
      },
      attributes: {},
      children: []
    };
    return merge(defaultData, payload);
  },
  validParentType: [
    BasicType.PAGE,
    BasicType.WRAPPER,
    BasicType.SECTION,
    BasicType.GROUP,
    BasicType.COLUMN,
    BasicType.HERO
  ],
  render(params) {
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-raw"
    }, params.data.data.value.content);
  }
});
const Template$1 = createBlock({
  get name() {
    return t("Template");
  },
  type: BasicType.TEMPLATE,
  create: (payload) => {
    const defaultData = {
      type: BasicType.TEMPLATE,
      data: {
        value: {
          idx: ""
        }
      },
      attributes: {},
      children: []
    };
    return merge(defaultData, payload);
  },
  validParentType: [],
  render(params) {
    const { data } = params;
    return /* @__PURE__ */ React.createElement(React.Fragment, null, `
          ${data.children.map((child) => React.createElement(BlockRenderer, __spreadProps(__spreadValues({}, params), {
      data: child
    })))}
        `);
  }
});
const AccordionElement$1 = createBlock({
  get name() {
    return t("Accordion element");
  },
  type: BasicType.ACCORDION_ELEMENT,
  create: (payload) => {
    const defaultData = {
      type: BasicType.ACCORDION_ELEMENT,
      data: {
        value: {}
      },
      attributes: {
        "icon-align": "middle",
        "icon-height": "32px",
        "icon-width": "32px",
        "icon-position": "right"
      },
      children: []
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.ACCORDION],
  render(params) {
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-accordion-element"
    });
  }
});
const AccordionTitle$1 = createBlock({
  get name() {
    return t("Accordion title");
  },
  type: BasicType.ACCORDION_TITLE,
  create: (payload) => {
    const defaultData = {
      type: BasicType.ACCORDION_TITLE,
      data: {
        value: {
          content: "Why use an accordion?"
        }
      },
      attributes: {
        "font-size": "13px",
        padding: "16px 16px 16px 16px"
      },
      children: []
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.ACCORDION],
  render(params) {
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-accordion-title"
    }, params.data.data.value.content);
  }
});
const AccordionText$1 = createBlock({
  get name() {
    return t("Accordion text");
  },
  type: BasicType.ACCORDION_TEXT,
  create: (payload) => {
    const defaultData = {
      type: BasicType.ACCORDION_TEXT,
      data: {
        value: {
          content: "Because emails with a lot of content are most of the time a very bad experience on mobile, mj-accordion comes handy when you want to deliver a lot of information in a concise way"
        }
      },
      attributes: {
        "font-size": "13px",
        padding: "16px 16px 16px 16px",
        "line-height": "1"
      },
      children: []
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.ACCORDION],
  render(params) {
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-accordion-text"
    }, params.data.data.value.content);
  }
});
const Accordion$1 = createBlock({
  get name() {
    return t("Accordion");
  },
  type: BasicType.ACCORDION,
  validParentType: [BasicType.COLUMN],
  create: (payload) => {
    const defaultData = {
      type: BasicType.ACCORDION,
      data: {
        value: {}
      },
      attributes: {
        "icon-height": "32px",
        "icon-width": "32px",
        "icon-align": "middle",
        "icon-position": "right",
        "icon-unwrapped-url": getImg("IMAGE_09"),
        "icon-wrapped-url": getImg("IMAGE_10"),
        padding: "10px 25px 10px 25px",
        border: "1px solid #d9d9d9"
      },
      children: [
        AccordionElement$1.create({
          children: [
            AccordionTitle$1.create({
              data: {
                value: {
                  content: "Why use an accordion?"
                }
              }
            }),
            AccordionText$1.create({
              data: {
                value: {
                  content: "Because emails with a lot of content are most of the time a very bad experience on mobile, mj-accordion comes handy when you want to deliver a lot of information in a concise way."
                }
              }
            })
          ]
        }),
        AccordionElement$1.create({
          children: [
            AccordionTitle$1.create({
              data: {
                value: {
                  content: "How it works"
                }
              }
            }),
            AccordionText$1.create({
              data: {
                value: {
                  content: "Content is stacked into tabs and users can expand them at will. If responsive styles are not supported (mostly on desktop clients), tabs are then expanded and your content is readable at once."
                }
              }
            })
          ]
        })
      ]
    };
    return mergeBlock(defaultData, payload);
  },
  render(params) {
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-accordion"
    });
  }
});
const Table$1 = createBlock({
  get name() {
    return t("Table");
  },
  type: BasicType.TABLE,
  create: (payload) => {
    const defaultData = {
      type: BasicType.TABLE,
      data: {
        value: {
          content: ""
        }
      },
      attributes: {},
      children: []
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.COLUMN],
  render(params) {
    const { data } = params;
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-table"
    }, data.data.value.content);
  }
});
const standardBlocks = {
  [BasicType.PAGE]: Page$1,
  [BasicType.SECTION]: Section$1,
  [BasicType.COLUMN]: Column$1,
  [BasicType.TEXT]: Text$1,
  [BasicType.IMAGE]: Image$1,
  [BasicType.GROUP]: Group$1,
  [BasicType.BUTTON]: Button$1,
  [BasicType.DIVIDER]: Divider$1,
  [BasicType.WRAPPER]: Wrapper$1,
  [BasicType.SPACER]: Spacer$1,
  [BasicType.RAW]: Raw$1,
  [BasicType.CAROUSEL]: Carousel$1,
  [BasicType.HERO]: Hero$1,
  [BasicType.NAVBAR]: Navbar$1,
  [BasicType.SOCIAL]: Social$1,
  [BasicType.TEMPLATE]: Template$1,
  [BasicType.ACCORDION]: Accordion$1,
  [BasicType.ACCORDION_ELEMENT]: AccordionElement$1,
  [BasicType.ACCORDION_TITLE]: AccordionTitle$1,
  [BasicType.ACCORDION_TEXT]: AccordionText$1,
  [BasicType.TABLE]: Table$1
};
const createCustomBlock = createBlock;
function generateAdvancedBlock(option) {
  const baseBlock = Object.values(standardBlocks).find(
    (b) => b.type === option.baseType
  );
  if (!baseBlock) {
    throw new Error(`Can not find ${option.baseType}`);
  }
  return createCustomBlock({
    get name() {
      return baseBlock.name;
    },
    type: option.type,
    validParentType: option.validParentType,
    create: (payload) => {
      const defaultData = __spreadProps(__spreadValues({}, baseBlock.create()), {
        type: option.type
      });
      return merge(defaultData, payload);
    },
    render: (params) => {
      const { data, idx, mode, context, dataSource } = params;
      const { iteration, condition } = data.data.value;
      const getBaseContent = (bIdx, index2) => option.getContent({
        index: index2,
        data,
        idx: bIdx,
        mode,
        context,
        dataSource
      });
      let children = getBaseContent(idx, 0);
      if (mode === "testing") {
        return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(React.Fragment, {
          key: "children"
        }, children), new Array(((iteration == null ? void 0 : iteration.mockQuantity) || 1) - 1).fill(true).map((_, index2) => /* @__PURE__ */ React.createElement(React.Fragment, {
          key: index2
        }, getBaseContent(idx, index2 + 1))));
      }
      if (condition && condition.enabled) {
        children = TemplateEngineManager.generateTagTemplate("condition")(
          condition,
          children
        );
      }
      if (iteration && iteration.enabled) {
        children = TemplateEngineManager.generateTagTemplate("iteration")(
          iteration,
          children
        );
      }
      return children;
    }
  });
}
var Operator = /* @__PURE__ */ ((Operator2) => {
  Operator2["TRUTHY"] = "truthy";
  Operator2["FALSY"] = "falsy";
  Operator2["EQUAL"] = "==";
  Operator2["NOT_EQUAL"] = "!=";
  Operator2["GREATER"] = ">";
  Operator2["GREATER_OR_EQUAL"] = ">=";
  Operator2["LESS"] = "<";
  Operator2["LESS_OR_EQUAL"] = "<=";
  return Operator2;
})(Operator || {});
var OperatorSymbol = /* @__PURE__ */ ((OperatorSymbol2) => {
  OperatorSymbol2["AND"] = "and";
  OperatorSymbol2["OR"] = "or";
  return OperatorSymbol2;
})(OperatorSymbol || {});
function MjmlBlock({
  idx,
  value,
  type,
  attributes,
  children
}) {
  const { mode } = useEmailRenderContext();
  const block = BlockManager.getBlockByType(type);
  if (!block) {
    throw new Error(`Can no find ${type}`);
  }
  const mergeValue = useMemo(() => {
    if (typeof children === "string") {
      if (!value) {
        return {
          content: children
        };
      } else {
        set(value, "content", children);
        return value;
      }
    }
    return value;
  }, [children, value]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, block.render({
    idx,
    mode,
    data: {
      type: block.type,
      data: {
        value: mergeValue
      },
      attributes,
      children: []
    },
    children
  }));
}
function Page(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.PAGE
  }, props.children);
}
function Section(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.SECTION
  }, props.children);
}
function Column(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.COLUMN
  }, props.children);
}
function Text(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.TEXT
  }, props.children);
}
function Image(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.IMAGE
  }, props.children);
}
function Group(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.GROUP
  }, props.children);
}
function Button(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.BUTTON
  }, props.children);
}
function Divider(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.DIVIDER
  }, props.children);
}
function Wrapper(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.WRAPPER
  }, props.children);
}
function Spacer(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.SPACER
  }, props.children);
}
function Raw(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.RAW
  }, props.children);
}
function Accordion(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.ACCORDION
  }, props.children);
}
function AccordionElement(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.ACCORDION_ELEMENT
  }, props.children);
}
function AccordionTitle(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.ACCORDION_TITLE
  }, props.children);
}
function AccordionText(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.ACCORDION_TEXT
  }, props.children);
}
function Carousel(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.CAROUSEL
  }, props.children);
}
function Hero(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.HERO
  }, props.children);
}
function Navbar(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.NAVBAR
  }, props.children);
}
function Social(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.SOCIAL
  }, props.children);
}
function Table(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.TABLE
  }, props.children);
}
function Template(props) {
  return props.children;
}
var index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Page,
  Section,
  Column,
  Text,
  Image,
  Group,
  Button,
  Divider,
  Wrapper,
  Spacer,
  Raw,
  Accordion,
  AccordionElement,
  AccordionTitle,
  AccordionText,
  Carousel,
  Hero,
  Navbar,
  Social,
  Table,
  Template,
  BlockRenderer,
  MjmlBlock
}, Symbol.toStringTag, { value: "Module" }));
function classnames(...rest) {
  return rest.filter((item) => typeof item === "string").join(" ");
}
function ancestorOf(type, targetType) {
  let level = -1;
  const paths = BlockManager.getAutoCompletePath(type, targetType);
  if (paths) {
    return paths.length + 1;
  }
  return level;
}
function getPageIdx() {
  return "content";
}
function getChildIdx(idx, index2) {
  return `${idx}.children.[${index2}]`;
}
function getNodeIdxClassName(idx) {
  return `node-idx-${idx}`;
}
function getNodeTypeClassName(type) {
  return `node-type-${type}`;
}
function getNodeIdxFromClassName(classList) {
  var _a;
  return (_a = Array.from(classList).find((item) => item.includes("node-idx-"))) == null ? void 0 : _a.replace("node-idx-", "");
}
function getNodeTypeFromClassName(classList) {
  var _a;
  return (_a = Array.from(isString(classList) ? classList.split(" ") : classList).find((item) => item.includes("node-type-"))) == null ? void 0 : _a.replace("node-type-", "");
}
const getIndexByIdx = (idx) => {
  var _a;
  return Number((_a = /\.\[(\d+)\]$/.exec(idx)) == null ? void 0 : _a[1]) || 0;
};
const getParentIdx = (idx) => {
  var _a;
  if (idx === getPageIdx())
    return void 0;
  return (_a = /(.*)\.children\.\[\d+\]$/.exec(idx)) == null ? void 0 : _a[1];
};
const getValueByIdx = (values, idx) => {
  return get(values, idx);
};
const getParentByIdx = (values, idx) => {
  return get(values, getParentIdx(idx) || "");
};
const getSiblingIdx = (sourceIndex, num) => {
  return sourceIndex.replace(/\[(\d+)\]$/, (_, index2) => {
    if (Number(index2) + num < 0)
      return "[0]";
    return `[${Number(index2) + num}]`;
  });
};
const getParentByType = (context, idx, type) => {
  if (!idx)
    return null;
  let parentIdx = getParentIdx(idx);
  while (parentIdx) {
    const parent = get(context, parentIdx);
    if (parent && parent.type === type)
      return parent;
    parentIdx = getParentIdx(idx);
  }
  return null;
};
const getSameParent = (values, idx, dragType) => {
  let parentIdx = idx;
  const block = BlockManager.getBlockByType(dragType);
  if (!block)
    return null;
  while (parentIdx) {
    const parent = get(values, parentIdx);
    if (ancestorOf(block.type, parent.type) > 0) {
      return {
        parent,
        parentIdx
      };
    }
    parentIdx = getParentIdx(parentIdx);
  }
  return null;
};
const getParenRelativeByType = (context, idx, type) => {
  let prevIdx = "";
  let parentIdx = idx;
  while (parentIdx) {
    const parent = get(context, parentIdx);
    if (parent && parent.type === type) {
      return {
        insertIndex: prevIdx ? getIndexByIdx(prevIdx) : parent.children.length - 1,
        parentIdx,
        parent
      };
    } else {
      prevIdx = parentIdx;
      parentIdx = getParentIdx(parentIdx);
    }
  }
  return null;
};
const getValidChildBlocks = (type) => {
  return BlockManager.getBlocks().filter(
    (item) => item.validParentType.includes(type)
  );
};
function getPreviewClassName(idx, type) {
  return classnames(
    "email-block",
    idx && getNodeIdxClassName(idx),
    getNodeTypeClassName(type)
  );
}
function generateAdvancedContentBlock(option) {
  return generateAdvancedBlock(__spreadProps(__spreadValues({}, option), {
    validParentType: [
      BasicType.PAGE,
      BasicType.WRAPPER,
      BasicType.COLUMN,
      BasicType.GROUP,
      BasicType.HERO,
      AdvancedType.WRAPPER,
      AdvancedType.COLUMN,
      AdvancedType.GROUP,
      AdvancedType.HERO
    ],
    getContent: (params) => {
      const { data, idx, mode, context, index: index2 } = params;
      const previewClassName = mode === "testing" ? classnames(
        index2 === 0 && idx && getPreviewClassName(idx, data.type)
      ) : "";
      const blockData = __spreadProps(__spreadValues({}, data), {
        type: option.baseType,
        attributes: __spreadProps(__spreadValues({}, data.attributes), {
          "css-class": classnames(
            data.attributes["css-class"],
            previewClassName
          )
        })
      });
      const block = BlockManager.getBlockByType(blockData.type);
      if (!block) {
        throw new Error(`Can not find ${blockData.type}`);
      }
      const children = block == null ? void 0 : block.render(__spreadProps(__spreadValues({}, params), { data: blockData, idx }));
      const parentBlockData = getParentByIdx({ content: context }, idx);
      if (!parentBlockData) {
        return children;
      }
      if (parentBlockData.type === BasicType.PAGE || parentBlockData.type === BasicType.WRAPPER || parentBlockData.type === AdvancedType.WRAPPER) {
        return /* @__PURE__ */ React.createElement(Section, {
          padding: "0px",
          "text-align": "left"
        }, /* @__PURE__ */ React.createElement(Column, null, children));
      }
      return children;
    }
  }));
}
function generateAdvancedLayoutBlock(option) {
  return generateAdvancedBlock(__spreadProps(__spreadValues({}, option), {
    getContent: (params) => {
      const { data, idx, mode, index: index2 } = params;
      const { iteration } = data.data.value;
      const blockData = __spreadProps(__spreadValues({}, data), {
        type: option.baseType
      });
      if (data.type === AdvancedType.COLUMN && (iteration == null ? void 0 : iteration.enabled)) {
        data.attributes.width = data.attributes.width || "100%";
      }
      const previewClassName = mode === "testing" ? classnames(
        index2 === 0 && idx && getPreviewClassName(idx, data.type)
      ) : "";
      return /* @__PURE__ */ React.createElement(BlockRenderer, {
        idx: null,
        data: __spreadProps(__spreadValues({}, blockData), {
          attributes: __spreadProps(__spreadValues({}, blockData.attributes), {
            "css-class": classnames(
              data.attributes["css-class"],
              previewClassName
            )
          })
        })
      }, blockData.children.map((child, index22) => {
        return /* @__PURE__ */ React.createElement(BlockRenderer, __spreadProps(__spreadValues({
          key: index22
        }, params), {
          data: child,
          idx: idx ? getChildIdx(idx, index22) : null
        }));
      }));
    }
  }));
}
function generateAdvancedTableBlock(option) {
  return createCustomBlock({
    get name() {
      return t("Table");
    },
    type: option.type,
    validParentType: [BasicType.COLUMN],
    create: (payload) => {
      const defaultData = {
        type: option.type,
        data: {
          value: {
            tableSource: [
              [{ content: "header1" }, { content: "header2" }, { content: "header3" }],
              [{ content: "body1-1" }, { content: "body1-2" }, { content: "body1-3" }],
              [{ content: "body2-1" }, { content: "body2-2" }, { content: "body2-3" }]
            ]
          }
        },
        attributes: {
          cellBorderColor: "#000000",
          cellPadding: "8px",
          "text-align": "center"
        },
        children: []
      };
      return merge(defaultData, payload);
    },
    render: (params) => {
      const { data } = params;
      const { cellPadding, cellBorderColor } = data.attributes;
      const textAlign = data.attributes["text-align"];
      const fontStyle = data.attributes["font-style"];
      const content = data.data.value.tableSource.map((tr, index2) => {
        const styles = [];
        if (cellPadding) {
          styles.push(`padding: ${cellPadding}`);
        }
        if (cellBorderColor) {
          styles.push(`border: 1px solid ${cellBorderColor}`);
        }
        const _trString = tr.map(
          (e) => `<td rowspan="${e.rowSpan || 1}" colspan="${e.colSpan || 1}" style="${styles.join(";")}; background-color:${e.backgroundColor};">${e.content}</td>`
        );
        return `<tr style="text-align:${textAlign};font-style:${fontStyle};">${_trString.join(
          "\n"
        )}</tr>`;
      }).join("\n");
      return /* @__PURE__ */ React.createElement(BasicBlock, {
        params,
        tag: "mj-table"
      }, content);
    }
  });
}
const AdvancedText = generateAdvancedContentBlock({
  type: AdvancedType.TEXT,
  baseType: BasicType.TEXT
});
const AdvancedButton = generateAdvancedContentBlock({
  type: AdvancedType.BUTTON,
  baseType: BasicType.BUTTON
});
const AdvancedImage = generateAdvancedContentBlock({
  type: AdvancedType.IMAGE,
  baseType: BasicType.IMAGE
});
const AdvancedDivider = generateAdvancedContentBlock({
  type: AdvancedType.DIVIDER,
  baseType: BasicType.DIVIDER
});
const AdvancedSpacer = generateAdvancedContentBlock({
  type: AdvancedType.SPACER,
  baseType: BasicType.SPACER
});
const AdvancedNavbar = generateAdvancedContentBlock({
  type: AdvancedType.NAVBAR,
  baseType: BasicType.NAVBAR
});
const AdvancedAccordion = generateAdvancedContentBlock({
  type: AdvancedType.ACCORDION,
  baseType: BasicType.ACCORDION
});
const AdvancedCarousel = generateAdvancedContentBlock({
  type: AdvancedType.CAROUSEL,
  baseType: BasicType.CAROUSEL
});
const AdvancedSocial = generateAdvancedContentBlock({
  type: AdvancedType.SOCIAL,
  baseType: BasicType.SOCIAL
});
const AdvancedTable = generateAdvancedTableBlock({
  type: AdvancedType.TABLE,
  baseType: BasicType.TABLE
});
const AdvancedWrapper = generateAdvancedLayoutBlock({
  type: AdvancedType.WRAPPER,
  baseType: BasicType.WRAPPER,
  validParentType: [BasicType.PAGE]
});
const AdvancedSection = generateAdvancedLayoutBlock({
  type: AdvancedType.SECTION,
  baseType: BasicType.SECTION,
  validParentType: [BasicType.PAGE, BasicType.WRAPPER, AdvancedType.WRAPPER]
});
const AdvancedGroup = generateAdvancedLayoutBlock({
  type: AdvancedType.GROUP,
  baseType: BasicType.GROUP,
  validParentType: [BasicType.SECTION, AdvancedType.SECTION]
});
const AdvancedColumn = generateAdvancedLayoutBlock({
  type: AdvancedType.COLUMN,
  baseType: BasicType.COLUMN,
  validParentType: [
    BasicType.SECTION,
    AdvancedType.SECTION,
    BasicType.GROUP,
    AdvancedType.GROUP
  ]
});
const AdvancedHero = generateAdvancedLayoutBlock({
  type: AdvancedType.HERO,
  baseType: BasicType.HERO,
  validParentType: [BasicType.WRAPPER, AdvancedType.WRAPPER, BasicType.PAGE]
});
const advancedBlocks = {
  [AdvancedType.TEXT]: AdvancedText,
  [AdvancedType.BUTTON]: AdvancedButton,
  [AdvancedType.IMAGE]: AdvancedImage,
  [AdvancedType.DIVIDER]: AdvancedDivider,
  [AdvancedType.SPACER]: AdvancedSpacer,
  [AdvancedType.NAVBAR]: AdvancedNavbar,
  [AdvancedType.ACCORDION]: AdvancedAccordion,
  [AdvancedType.CAROUSEL]: AdvancedCarousel,
  [AdvancedType.SOCIAL]: AdvancedSocial,
  [AdvancedType.TABLE]: AdvancedTable,
  [AdvancedType.WRAPPER]: AdvancedWrapper,
  [AdvancedType.SECTION]: AdvancedSection,
  [AdvancedType.GROUP]: AdvancedGroup,
  [AdvancedType.COLUMN]: AdvancedColumn,
  [AdvancedType.HERO]: AdvancedHero
};
class BlockManager {
  static setAutoCompletePath() {
    const paths = {};
    const renderFullPath = (type, pathObj, prevPaths) => {
      const block = this.getBlockByType(type);
      if (!block) {
        throw new Error(`Can you register ${type} block`);
      }
      const currentPaths = [...prevPaths, type];
      if (block.validParentType.length === 0) {
        pathObj.push(currentPaths);
      }
      return block.validParentType.map((item) => {
        return renderFullPath(item, pathObj, currentPaths);
      });
    };
    Object.values(this.blocksMap).forEach((item) => {
      paths[item.type] = [];
      renderFullPath(item.type, paths[item.type], []);
    });
    return paths;
  }
  static getBlocks() {
    return Object.values(this.blocksMap);
  }
  static registerBlocks(blocksMap) {
    this.blocksMap = __spreadValues(__spreadValues({}, this.blocksMap), blocksMap);
    this.autoCompletePath = this.setAutoCompletePath();
  }
  static getBlockByType(type) {
    return this.blocksMap[type];
  }
  static getBlocksByType(types) {
    return types.map((item) => {
      const block = Object.values(this.blocksMap).find((child) => {
        return child.type === item;
      });
      return block;
    });
  }
  static getAutoCompleteFullPath() {
    if (Object.keys(this.autoCompletePath).length === 0) {
      this.autoCompletePath = this.setAutoCompletePath();
    }
    return this.autoCompletePath;
  }
  static getAutoCompletePath(type, targetType) {
    const block = this.getBlockByType(type);
    if (!block) {
      throw new Error(`Can you register ${type} block`);
    }
    if (block.validParentType.includes(targetType)) {
      return [];
    }
    const paths = this.getAutoCompleteFullPath()[type].find(
      (item) => item.filter((_, index2) => index2 !== 0).includes(targetType)
    );
    if (!paths)
      return null;
    const findIndex = paths.findIndex((item) => item === targetType);
    return paths.slice(1, findIndex);
  }
}
BlockManager.blocksMap = __spreadValues(__spreadValues({}, standardBlocks), advancedBlocks);
BlockManager.autoCompletePath = {};
function isValidBlockData(data) {
  try {
    if (data.attributes && data.children && data.data && data.type && BlockManager.getBlockByType(data.type)) {
      return true;
    }
  } catch (error) {
  }
  return false;
}
function parseReactBlockToBlockData(node) {
  return JSON.parse(unescape(renderToStaticMarkup(node)));
}
function createBlockDataByType(type, payload) {
  const component = BlockManager.getBlockByType(type);
  if (component) {
    return component.create(payload);
  }
  throw new Error(`No match \`${type}\` block`);
}
function generateIterationTemplate(option, content) {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Raw, null, `
        <!-- htmlmin:ignore -->
        {% for ${option.itemName} in ${option.dataSource} ${option.limit ? `limit:${option.limit}` : ""} %}
        <!-- htmlmin:ignore -->
        `), content, /* @__PURE__ */ React.createElement(Raw, null, " <!-- htmlmin:ignore -->{% endfor %}  <!-- htmlmin:ignore -->"));
}
function generateConditionTemplate(option, content) {
  const { symbol, groups } = option;
  const generateExpression = (condition) => {
    if (condition.operator === Operator.TRUTHY) {
      return condition.left;
    }
    if (condition.operator === Operator.FALSY) {
      return `${condition.left} == nil or ${condition.left} == false`;
    }
    return condition.left + " " + condition.operator + " " + (isNumber(condition.right) ? condition.right : `"${condition.right}"`);
  };
  const uuid = v4();
  const variables = groups.map((_, index2) => `con_${index2}_${uuid}`);
  const assignExpression = groups.map((item, index2) => {
    return `{% assign ${variables[index2]} = ${item.groups.map(generateExpression).join(` ${item.symbol} `)} %}`;
  }).join("\n");
  const conditionExpression = variables.join(` ${symbol} `);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Raw, null, `
        <!-- htmlmin:ignore -->
        ${assignExpression}
        {% if ${conditionExpression} %}
        <!-- htmlmin:ignore -->
        `), content, /* @__PURE__ */ React.createElement(Raw, null, `
        <!-- htmlmin:ignore -->
        {% endif %}
        <!-- htmlmin:ignore -->
        `));
}
class TemplateEngineManager {
  static setTag(option) {
    this.tags[option.name] = option.templateGenerateFn;
  }
  static generateTagTemplate(name) {
    return this.tags[name];
  }
}
TemplateEngineManager.tags = {
  iteration: generateIterationTemplate,
  condition: generateConditionTemplate
};
function isAdvancedBlock(type) {
  return Object.values(AdvancedType).includes(type);
}
function getAdapterAttributesString(params) {
  const { data, idx } = params;
  const isTest = params.mode === "testing";
  const attributes = __spreadValues({}, data.attributes);
  const keepClassName = isTest ? params.keepClassName : false;
  if (isTest && idx) {
    attributes["css-class"] = classnames(
      attributes["css-class"],
      EMAIL_BLOCK_CLASS_NAME,
      getNodeIdxClassName(idx),
      getNodeTypeClassName(data.type)
    );
  }
  if (keepClassName) {
    attributes["css-class"] = classnames(
      attributes["css-class"],
      getNodeTypeClassName(data.type)
    );
  }
  let attributeStr = "";
  for (let key in attributes) {
    const keyName = key;
    const val = attributes[keyName];
    if (typeof val === "boolean") {
      attributeStr += `${key}="${val.toString()}" `;
    } else if (isString(val) && val) {
      attributeStr += `${key}="${val.replace(/"/gm, "")}" `;
    }
  }
  return attributeStr;
}
export { AdvancedType, BasicType, BlockManager, EMAIL_BLOCK_CLASS_NAME, I18nManager, ImageManager, JsonToMjml, MERGE_TAG_CLASS_NAME, Operator, OperatorSymbol, TemplateEngineManager, advancedBlocks, ancestorOf, index as components, createBlock, createBlockDataByType, createCustomBlock, getAdapterAttributesString, getChildIdx, getIndexByIdx, getNodeIdxClassName, getNodeIdxFromClassName, getNodeTypeClassName, getNodeTypeFromClassName, getPageIdx, getParenRelativeByType, getParentByIdx, getParentByType, getParentIdx, getPreviewClassName, getSameParent, getSiblingIdx, getValidChildBlocks, getValueByIdx, isAdvancedBlock, isValidBlockData, mergeBlock, parseReactBlockToBlockData, standardBlocks, t };
//# sourceMappingURL=index.es.js.map

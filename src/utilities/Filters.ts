/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
export class Filters {
  /**
   * This method replaces all tags with sanitised input.
   *
   * @param   {string}  inputStr
   * @param   {string}  allowed
   * @return  {string}
   */
  public static stripTags(inputStr: string, allowed: string = ""): string {
    // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    allowed = (
      ((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []
    ).join("");

    const tags = /<\/?([a-z0-9]*)\b[^>]*>?/gi;
    const commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;

    // removes tha '<' char at the end of the string to replicate PHP's behaviour
    let after = inputStr;
    after =
      after.substring(after.length - 1) === "<"
        ? after.substring(0, after.length - 1)
        : after;

    // recursively remove tags to ensure that the returned string doesn't contain
    // forbidden tags after previous passes (e.g. '<<bait/>switch/>')
    let before;
    do {
      before = after;
      after = before
        .replace(commentsAndPhpTags, "")
        .replace(tags, function ($0, $1) {
          return allowed.indexOf("<" + $1.toLowerCase() + ">") > -1 ? $0 : "";
        });

      // return once no more tags are removed
      if (before === after) {
        return after;
      }
    } while (before !== after);
  }

  /**
   * This method replaces all occurences of
   *
   * @param   {string}  inputStr
   * @param   {string}  allowed
   * @return  {string}
   */
  public static replaceBy(
    haystack: string,
    needles: string[],
    replace: string = ""
  ): string {
    const escaped = [];
    needles.forEach((n) =>
      escaped.push(n.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"))
    );

    let result: string = haystack;
    while (escaped.length) {
      const needle = escaped.shift();
      result = result.replace(new RegExp(needle, "g"), replace);
    }

    return result;
  }
}

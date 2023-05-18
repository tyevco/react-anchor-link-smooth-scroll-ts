import React, { useCallback, useEffect } from 'react'
import * as polyfill from 'smoothscroll-polyfill';

type OffsetType = string | number | (() => number);

export function AnchorLink(props: { href?: string, offset?: OffsetType, onClick?: (event: any) => void }) {
  const { offset, ...rest } = props;

  useEffect(() => polyfill.polyfill(), []);

  const smoothScroll = useCallback((event: any) => {
    event.preventDefault()
    const e = { ...event }
    const { href, onClick } = rest;

    if (history.pushState && href) {
      history.pushState({}, '', href)
      window.dispatchEvent(new Event('hashchange'))
    }

    setTimeout(() => {
      let offsetCallback: () => number = () => 0
      let offsetType = typeof offset;
      if (offsetType !== 'undefined') {
        if (offsetType === "string") {
          offsetCallback = () => parseInt(offset as string)
        } else if (offsetType == "number") {
          offsetCallback = () => offset as number;
        } else {
          offsetCallback = offset as () => number;
        }
      }

      const id = e.currentTarget.getAttribute('href').slice(1)
      const $anchor = document.getElementById(id);
      // Check if the change occurs for the x or y axis
      if ($anchor && $anchor.getBoundingClientRect().top !== 0) {
        window.scroll({
          top: $anchor.getBoundingClientRect().top + window.scrollY - offsetCallback(),
          behavior: 'smooth'
        });
      } else if ($anchor && $anchor.getBoundingClientRect().left !== 0) {
        window.scroll({
          left: $anchor.getBoundingClientRect().left + window.scrollX - offsetCallback(),
          behavior: 'smooth'
        });
      }
      if (onClick) { onClick(e) }
    }, 0);
  }, [offset, rest]);

  return <a {...rest} onClick={smoothScroll} />;
}
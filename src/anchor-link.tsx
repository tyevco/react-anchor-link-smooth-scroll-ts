import React, { Component } from 'react'
import * as polyfill from 'smoothscroll-polyfill';

type OffsetType = string | number | (() => number);

export class AnchorLink extends Component<{ href: string, offset: OffsetType, onClick: (event: any) => void }> {
  constructor(props: any) {
    super(props)
    this.smoothScroll = this.smoothScroll.bind(this)
  }

  componentDidMount() {
    polyfill.polyfill()
  }

  smoothScroll(event: any) {
    event.preventDefault()
    const e = { ...event }
    const { href } = this.props;
    if (history.pushState && href) {
      history.pushState({}, '', href)
      window.dispatchEvent(new Event('hashchange'))
    }

    setTimeout(() => {
      let offset: () => number = () => 0
      let offsetType = typeof this.props.offset;
      if (offsetType !== 'undefined') {
        if (offsetType === "string") {
          offset = () => parseInt(this.props.offset as string)
        } else if (offsetType == "number") {
          offset = () => this.props.offset as number;
        } else {
          offset = this.props.offset as () => number;
        }
      }

      const id = e.currentTarget.getAttribute('href').slice(1)
      const $anchor = document.getElementById(id);
      // Check if the change occurs for the x or y axis
      if ($anchor && $anchor.getBoundingClientRect().top !== 0) {
        window.scroll({
          top: $anchor.getBoundingClientRect().top + window.pageYOffset - offset(),
          behavior: 'smooth'
        });
      } else if ($anchor && $anchor.getBoundingClientRect().left !== 0) {
        window.scroll({
          left: $anchor.getBoundingClientRect().left + window.pageXOffset - offset(),
          behavior: 'smooth'
        });
      }
      if (this.props.onClick) { this.props.onClick(e) }
    }, 0);
  }
  render() {
    const { offset, ...rest } = this.props;
    return (
      <a {...rest} onClick={this.smoothScroll} />
    )
  }
}

export default AnchorLink

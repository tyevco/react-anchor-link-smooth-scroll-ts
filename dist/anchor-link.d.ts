import React, { Component } from 'react';
type OffsetType = string | number | (() => number);
export declare class AnchorLink extends Component<{
    href?: string;
    offset?: OffsetType;
    onClick?: (event: any) => void;
}> {
    constructor(props: any);
    componentDidMount(): void;
    smoothScroll(event: any): void;
    render(): React.JSX.Element;
}
export default AnchorLink;

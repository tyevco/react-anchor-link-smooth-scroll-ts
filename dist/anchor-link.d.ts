import React from 'react';
type OffsetType = string | number | (() => number);
export declare function AnchorLink(props: {
    href?: string;
    offset?: OffsetType;
    onClick?: (event: any) => void;
}): React.JSX.Element;
export {};

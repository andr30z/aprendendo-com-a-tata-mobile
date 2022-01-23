export interface MarkItemMarkProps {
    size?: number;
    color?: string;
    position?: {
      top?: number | string;
      bottom?: number | string;
      right?: number | string;
      left?: number | string;
    };
    absolutePosition?: boolean;
  }
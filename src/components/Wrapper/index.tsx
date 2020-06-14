import React, { forwardRef, ReactNode } from "react";
import styled from "styled-components/macro";

const StyledWrapper = styled.div``;

interface WrapperInterface {
  styles?: any[];
  as?: any;
  appendProps?: any;
  children?: ReactNode;
}

export default React.memo(
  forwardRef(function (props: WrapperInterface, ref) {
    const { styles, as, appendProps, children } = props;
    return (
      <StyledWrapper ref={ref} css={styles} as={as} {...appendProps}>
        {children}
      </StyledWrapper>
    );
  }),
);

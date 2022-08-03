import React, { useEffect, useMemo, useRef, useState } from "react";
import { FlattenSimpleInterpolation } from "styled-components";
import { useIsInViewport } from "../../../hooks/useIsInViewport";
import { IAnimationProps } from "../types";

import { Char, Container } from "./styles";

interface IBaseComponentProps extends IAnimationProps {
  initialState: FlattenSimpleInterpolation;
  animationState: FlattenSimpleInterpolation; 
}

const BaseComponent = ({ text, styles, className, animationState, initialState, accessibilityFriendly = false }: IBaseComponentProps) => {
    const spanRef = useRef(null)
    const isInViewport = useIsInViewport(spanRef);
    const [animationCompleted, setAnimationCompleted] = useState(false);

    const animationLength = useMemo(() => 0.5 + (text.length) * 0.1, [text])

    useEffect(() => {
        if(isInViewport){
            setTimeout(() => setAnimationCompleted(true), animationLength * 1000)
        } else {
            setAnimationCompleted(false)
        }
    }, [isInViewport])

    return (
        <Container>
            <p>
                <span ref={spanRef} className={className} aria-label={text}>
                    {(!animationCompleted || (animationCompleted && !accessibilityFriendly)) && text.split("").map((item, index) => (
                        <Char
                            isInViewport={isInViewport}
                            charIndex={index}
                            key={index}
                            char={item}
                            style={{...styles}}
                            initialState={initialState}
                            animationState={animationState} 
                            aria-hidden="true"
                        >
                            {item !== ' ' ? item : "\u00a0"}
                        </Char>
                    ))}
                    {animationCompleted && accessibilityFriendly && text}
                </span>
            </p>      
        </Container>
    );
};


export default BaseComponent;
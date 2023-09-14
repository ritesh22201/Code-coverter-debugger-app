import React, { useEffect, useState } from 'react';
import Prism from 'prismjs';
import { Box } from '@chakra-ui/react';

const CodeBlock = ({ className = '', children }) => {

    useEffect(() => {
        if (typeof window !== undefined) {
            Prism.highlightAll();
        }
    }, [])

    return (
        <Box>
            <pre>
                <code className={className}>{children}</code>
            </pre>
        </Box>
    )
}

export default CodeBlock
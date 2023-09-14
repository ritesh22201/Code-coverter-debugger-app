import { Box, Button, Divider, Flex, Heading, Select, Text, Textarea } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CodeBlock from './CodeBlock';
import Loader from './Loader';
import '../loader.css'

const CodeConverter = () => {
    const [language, setLanguage] = useState('');
    const [code, setCode] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const handleRequest = async (prompt_data, query) => {
        try {
            setIsLoading(true);
            await axios.post(`https://code-converter-debugger-app.onrender.com/code/${query}`, prompt_data)
                .then(res => {
                    setIsLoading(false);
                    setResponse(res?.data);
                })
                .catch(err => {
                    setIsLoading(false);
                    console.log(err);
                })
        } catch (error) {
            console.log(error);
        }
    }

    const handleConvert = async () => {
        handleRequest({ code, language }, 'convert');
    }

    const handleDebug = async () => {
        handleRequest({ code }, 'debug');
    }

    const handleQuality = async () => {
        handleRequest({ code }, 'qualityCheck');
    }


    return (
        <Box p={'20px'} minH={'100vh'} textAlign={'center'}>
            <Box h={'100vh'}>
                <Heading fontFamily="'Fredoka', sans-serif" pb={'15px'} size={'lg'}>CODE CONVERTER</Heading>
                <Flex flexDirection={{ base: 'column', sm: 'column', md: 'column', lg: 'row', xl: 'row', '2xl': 'row' }} gap={'20px'}>
                    <Box w={{ base: '95%', sm: '95%', md: '85%', lg: '50%', xl: '50%', '2xl': '50%' }} m={'auto'}>
                        <Heading fontFamily="'Fredoka', sans-serif" pb={'18px'} size={'md'}>INPUT</Heading>
                        <Flex alignItems={'center'} gap={'20px'} pb={'20px'}>
                            <Text>Convert to :- </Text>
                            <Select value={language} onChange={(e) => setLanguage(e.target.value)} bgColor={'black'} w={'50%'} color={'gray.600'} focusBorderColor='none'>
                                <option value="">Select Language</option>
                                <option value="python">Python</option>
                                <option value="java">Java</option>
                                <option value="php">PHP</option>
                                <option value="c++">C++</option>
                                <option value="ruby">Ruby</option>
                            </Select>
                        </Flex>
                        <CodeBlock className={`language-${language}`}>
                            <Textarea value={code} border={'none'} onChange={(e) => setCode(e.target.value)} p={'20px'} textDecoration={'none'} focusBorderColor='none' minH={{ base: '50vh', sm: '50vh', md: '50vh', lg: '75vh', xl: '75vh', '2xl': '75vh' }} bg={'#2a3944'} placeholder='Write your code here...'></Textarea>
                        </CodeBlock>
                    </Box>
                    <Box position={'relative'} w={{ base: '95%', sm: '95%', md: '85%', lg: '50%', xl: '50%', '2xl': '50%' }} m={'auto'}>
                        <Heading fontFamily="'Fredoka', sans-serif" pb={'25px'} size={'md'}>OUTPUT</Heading>
                        <Flex w={{ base: '95%', sm: '95%', md: '85%', lg: '50%', xl: '50%', '2xl': '50%' }} gap={'10px'} justifyContent={'space-between'} m={'0 auto 20px auto'}>
                            <Button onClick={handleConvert} isDisabled={code ? false : true} colorScheme='blue'>Convert</Button>
                            <Button onClick={handleDebug} isDisabled={code ? false : true} colorScheme='blue'>Debug</Button>
                            <Button onClick={handleQuality} isDisabled={code ? false : true} colorScheme='blue'>Quality Check</Button>
                        </Flex>
                        {isLoading && <Box position={'absolute'} zIndex={'overlay'} top={'50%'} right={'45%'}><Loader /></Box>}
                        <CodeBlock className={`language-${language}`}>
                            <Box>
                                <Textarea color={'gray.400'} className="scrollbar" readOnly value={!isLoading ? response : ''} p={'20px'} focusBorderColor='none' border={'1px inset gray'} minH={{ base: '50vh', sm: '50vh', md: '50vh', lg: '75vh', xl: '75vh', '2xl': '75vh' }} bg={'#1b252c'} placeholder={!isLoading && 'Response will be shown here...'}></Textarea>
                            </Box>
                        </CodeBlock>
                    </Box>
                </Flex>
            </Box>
        </Box>
    )
}

export default CodeConverter;
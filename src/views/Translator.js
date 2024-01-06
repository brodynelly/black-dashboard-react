import React, { useState } from 'react';
import translateText from './api';
import classNames from "classnames";


// reactstrap components
import {
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Label,
    FormGroup,
    Input,
    Table,
    Row,
    Col,
    UncontrolledTooltip,
  } from "reactstrap";
  
  // core components
  import {
    chartExample1,
    chartExample2,
    chartExample3,
    chartExample4,
  } from "variables/charts.js";

function Translator({ originalArticle, resetApp }) {
  const [selectedWords, setSelectedWords] = useState([]);
  const [translatedSentence, setTranslatedSentence] = useState('');
  

  const handleTextClick = (word) => {
    setSelectedWords((prevSelectedWords) => {
      if (prevSelectedWords.includes(word)) {
        // If word is already selected, remove it
        return prevSelectedWords.filter((selectedWord) => selectedWord !== word);
      } else {
        // If word is not selected, add it in the order of the original article
        const originalWords = originalArticle.split(' ');
        const selectedIndex = originalWords.indexOf(word);
        const newSelectedWords = [...prevSelectedWords];
        newSelectedWords[selectedIndex] = word;
        return newSelectedWords;
      }
    });
  };

  const handleTranslateClick = async () => {
    try {
      const selectedSentence = selectedWords.join(' ');
      const translationResult = await translateText(selectedSentence, 'en');
      setTranslatedSentence(translationResult);
    } catch (error) {
      console.error('Translation error:', error.message);
    }
  };

  const clearSelection = () => {
    setSelectedWords([]);
    setTranslatedSentence('');
    resetApp();
  };

  return (
    
    <div>
        <Row>
        <Col md="10">
            
            <Card>
                <CardHeader class="text-left">
                
                <p> <h5>Selected Words:</h5>{selectedWords.join(' ')}</p>
                </CardHeader>
                <CardBody>
                
                <p><h5>Translated Words:</h5> {translatedSentence}</p>
                <ButtonGroup
                className="btn-group-toggle float-right"
                data-toggle="buttons"
                >
                <Button
                tag="label"
                className="btn-simple"
                color="info"
                size="sm"
                onClick={clearSelection}
                >
                <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                 Clear Selection
                </span>
                </Button>
                </ButtonGroup>
                <ButtonGroup
                className="btn-group-toggle float-right"
                data-toggle="buttons"
                >
                <Button
                tag="label"
                className="btn-simple"
                color="info"
                size="sm"
                onClick={handleTranslateClick}
                >
                <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                 Translate
                </span>
                </Button>
                </ButtonGroup>
                </CardBody>
                
            </Card>

        </Col>
        
        <Col md="10">
            <Card>
            <CardHeader class="text-left">
                  <small>  original article</small>
                </CardHeader>
                <CardBody>
                <div>
                <p>
                {originalArticle.split(' ').map((word, index) => (
                <span
                key={index}
                onClick={() => handleTextClick(word)}
                style={{
                cursor: 'pointer',
                margin: '0 3px',
                display: 'inline-block',
                backgroundColor: selectedWords.includes(word) ? 'highlight' : 'transparent',
                }}
                >
                {word + ' '}
                </span>
                ))}
                </p>
                </div>
                </CardBody>
            </Card>
            </Col>

        
        </Row>


    
    

  </div>
        
      
  )};                                       

    
    
  


export default Translator;

/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useState} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import Translator from './Translator';

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

function Dashboard(props) {
  const [bigChartData, setbigChartData] = React.useState("data1");
  const setBgChartData = (name) => {
    setbigChartData(name);
  };
  
  const [screen, setScreen] = useState(1); // Initial screen
  const [articleInput, setArticleInput] = useState('');

  const handleTranslate = () => {
    setScreen(2); // Move to the next screen after input
  };

  const resetApp = () => {
    setScreen(1);
    setArticleInput('');
  };
  return (
    
    <div className="content">
      {screen === 1 && (
        <Col lg="9" md="30">
        <Card className = "main-text"> 
        <CardHeader>
          <CardTitle>
            <Col className="text-center" sm="12">
              <CardTitle>
                
                <h3>Translate</h3>
                <h5>paste your article down below to PRACTICE SPANISH!!</h5>
              </CardTitle>
            </Col>

          </CardTitle>
        </CardHeader>
        <CardBody>
         
         
        <form>
          <div class="form-group">
            <Label for="TextToBeTranslated"></Label>
            <textarea class="form-control" id="TextToBeTranslated" rows="50"
            value={articleInput} onChange={(e) => setArticleInput(e.target.value)}> 
              
            </textarea>
          </div>
      
        </form>
     
        <ButtonGroup
          className="btn-group-toggle float-right"
            data-toggle="buttons"
        >
        <Button
          tag="label"
          className="btn-simple"
          color="info"
          size="sm"
          onClick={handleTranslate}
        >
           <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
            Translate
          </span>
        </Button>
        </ButtonGroup>
        </CardBody>
        </Card>
        </Col> 
      )}

      {screen === 2 && (
        <div>
          <Translator originalArticle={articleInput} resetApp={resetApp} />

        </div>
      )}
    
        

         
      
    </div>
    
  );
}

export default Dashboard;

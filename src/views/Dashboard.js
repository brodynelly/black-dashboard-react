
import React, { useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import Translator from "./Translator";

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
	const [articleInput, setArticleInput] = useState("");

	const handleTranslate = () => {
		setScreen(2); // Move to the next screen after input
	};

	const resetApp = () => {
		setScreen(1);
		setArticleInput("");
	};
	return (
		<div className="content">
			{screen === 1 && (
				<Col lg="9" md="30">
					<Card className="main-text">
						<CardBody>
							<CardTitle className="text-center">
								<br />
								<b>
									<code style={{ fontSize: "30px", color: "white" }}>
										Translatoor
									</code>
								</b>
								<code style={{ color: "" }}>
									{" "}
									paste your article down below to PRACTICE SPANISH!!
								</code>
							</CardTitle>

							<form>
								<div class="form-group">
									<Label for="TextToBeTranslated"></Label>
									<textarea
										class="form-control"
										id="TextToBeTranslated"
										rows="50"
										value={articleInput}
										onChange={(e) => setArticleInput(e.target.value)}
									></textarea>
								</div>
							</form>
							<Col className="ml-auto mr-auto" lg="3">
								<ButtonGroup
									className="btn-group-toggle float-none"
									data-toggle="buttons"
								>
									<Button
										tag="label"
										className="btn-simple button-outline-gradient"
										color="green"
										size="lg"
										onClick={handleTranslate}
									>
										<code style={{ color: "white" }}>Translate</code>
									</Button>
								</ButtonGroup>
							</Col>
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

import {
	useState,
	useEffect,
	useRef,
	KeyboardEvent,
	ChangeEvent,
	ReactNode,
	ReactNodeArray,
} from "react";
import translateText from "./api";
import classNames from "classnames";
import "/Users/Brody Nelson/OneDrive - University of Missouri/Documents/Computer Science Projects/black-dashboard-react/src/assets/css/black-dashboard-react.css";
import Draggable from "react-draggable";
import TerminalInput from "./linetypes/TerminalInput";
import TerminalOutput from "./linetypes/TerminalOutput";
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

function Translator({ originalArticle, resetApp, props = {} }) {
	const [selectedWords, setSelectedWords] = useState([]);
	const [translatedSentence, setTranslatedSentence] = useState("");
	const [isBlockquoteVisible, setIsBlockquoteVisible] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [notes, setNotes] = useState("");

	const containerStyles = {
		width: "400px", // Adjust the width as needed
		height: "300px", // Adjust the height as needed
	};

	const titleBarStyles = {
		buttonContainer: {
			display: "none", // Hide the button container
		},
	};

	const handleTextClick = (word) => {
		setSelectedWords((prevSelectedWords) => {
			if (selectedWords.length < 1) {
				setIsBlockquoteVisible(false);
			}
			if (prevSelectedWords.includes(word)) {
				// If word is already selected, remove it

				return prevSelectedWords.filter(
					(selectedWord) => selectedWord !== word
				);
			} else {
				// If word is not selected, add it in the order of the original article
				const originalWords = originalArticle.split(" ");
				const selectedIndex = originalWords.indexOf(word);
				const newSelectedWords = [...prevSelectedWords];
				newSelectedWords[selectedIndex] = word;
				return newSelectedWords;
			}

			// If no words are selected, set the translated sentence to an empty string
		});
	};

	const handleTranslateClick = async () => {
		try {
			const selectedSentence = selectedWords.join(" ");
			const translationResult = await translateText(selectedSentence, "en");
			setTranslatedSentence(translationResult);
			setIsBlockquoteVisible(true);
		} catch (error) {
			console.error("Translation error:", error.message);
		}
	};
	const clearSelection = () => {
		setSelectedWords([]);
		setTranslatedSentence("");
		setIsBlockquoteVisible(false);
	};

	useEffect(
		() => {
			const handleKeyPress = (event) => {
				if (event.key === "Enter") {
					handleTranslateClick();
				} else if (event.key === "Backspace") {
					clearSelection();
				}
			};

			window.addEventListener("keydown", handleKeyPress);

			return () => {
				window.removeEventListener("keydown", handleKeyPress);
			};
		},
		[handleTranslateClick],
		[clearSelection]
	); // Add any other dependencies if needed
	const handleNoteChange = (e) => {
		setNotes(e.target.value);
	};

	return (
		<div>
			<Row>
				<Col md="10">
					<Card>
						<CardHeader class="text-left">
							<small>
								{" "}
								<code style={{ color: "gray" }}> original article</code>
							</small>
						</CardHeader>
						<CardBody>
							<div>
								<p>
									{originalArticle.split(" ").map((word, index) => (
										<span
											key={index}
											onClick={() => handleTextClick(word)}
											style={{
												cursor: "pointer",
												margin: "0 3px",
												display: "inline-block",
												backgroundColor: selectedWords.includes(word)
													? "highlight"
													: "transparent",
											}}
										>
											{word + " "}
										</span>
									))}
								</p>
							</div>
						</CardBody>
					</Card>
				</Col>
			</Row>

			<div className="container" style={containerStyles}>
				<Draggable>
					<Row>
						<Col md="12">
							<div class="card1">
								<div class="card-body">
									<form>
										<div class="form-group">
											<code>
												<textarea
													className="form-control"
													id="rows"
													rows="30"
                          width="30px"
													placeholder="Place notes here"
													style={{ fontSize: "10px", fontFamily: " Courier New " }}
													onChange={(e) => {
														// Handle user input (e.target.value)
													}}
												></textarea>
												<code>
													
												</code>
											</code>
										</div>
									</form>
								</div>
							</div>
						</Col>
					</Row>
				</Draggable>
			</div>

			<div>
				<Draggable>
					<Row>
						<Col md="6">
							<div class="card1">
								<div class="card-body">
									<p>
										<ui class="list-unstyled">
											<code class="code" style={{ color: "green" }}>
												<li>_Welcome To Leanring to Translate</li>
												<li>_Press "Enter" to translate </li>
												<li>_Press "Backspace" to Start-Over </li>
												<li>
													{" "}
													<p></p>{" "}
												</li>
												<li> </li>
											</code>
										</ui>
									</p>
									<small>
										<code>Selected Words-></code>
									</small>

									<small>
										<code class="code" style={{ color: "white" }}>
											{" "}
											_{selectedWords.join(" ")}
										</code>
									</small>

									{selectedWords.length > 0 && isBlockquoteVisible && (
										<p>
											<code className="code" style={{ color: "gray" }}>
												-------------------------------------------------------------------
											</code>

											<code>
												<small>Translate Words-> </small>
											</code>
											<small>
												<code className="code" style={{ color: "white" }}>
													{" "}
													_{translatedSentence}
												</code>
											</small>
										</p>
									)}

									<div></div>
								</div>
							</div>
						</Col>
					</Row>
				</Draggable>
			</div>
		</div>
	);
}

export default Translator;

import React, { Component } from "react";
import { Container, Row, Col, Card, CardBody, Form, FormGroup, InputGroup, Label, Input, Button } from "reactstrap";

import { SketchPicker } from "react-color";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr"
import Switch from "react-switch";
import Select from "react-select";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';


const optionGroup = [
	{
		label: "Picnic",
		options: [
			{ label: "Mustard", value: "Mustard" },
			{ label: "Ketchup", value: "Ketchup" },
			{ label: "Relish", value: "Relish" }
		]
	},
	{
		label: "Camping",
		options: [
			{ label: "Tent", value: "Tent" },
			{ label: "Flashlight", value: "Flashlight" },
			{ label: "Toilet Paper", value: "Toilet Paper" }
		]
	}
];

class FormAdvanced extends Component {
	constructor(props) {
		super(props);
		this.state = {
			breadcrumbItems: [
				{ title: "Forms", link: "#" },
				{ title: "Form Advanced", link: "#" },
			],
			color: "#8FFF00",
			colorRgb: "#4667CC",
			colorCust: "red",
			colorHor: "#88CC33",
			colorRGBA: "rgba(0, 194, 255, 0.78)",
			display_RGBA: false,

			default_date: new Date(),
			default: false,
			start_date: new Date(),
			monthDate: new Date(),
			yearDate: new Date(),
			end_date: new Date(),
			date: new Date(),

			disbadge: true,
			disthresh: false,
			placementbadge: false,
			textcount: 0,
			optioncount: 0,
			placementcount: 0,
			advanceclass: "badgecount",

			switch1: true,
			switch2: true,
			switch3: true,
			switch4: true,
			switch5: true,
			switch6: true,
			switch7: true,
			switch8: true,
			switch9: true,
			switch11: true,
			switch12: true,
			switch13: true,
			switch14: true,
			switch15: true,
			sq1: true,
      		sq2: true,

			data_attr: 56,
			postfix1: 20,
			postfix: 20,
			prefix: 25,
			empty_val: 0,
			not_attr: 15,
			explicit_val: 33,

			selectedGroup: null,
			selectedMulti: null,
			selectedMulti1: null,
			selectedMulti2: null,
			selectedMulti3: null,

			max_len: 25
		};
		//colorpicker
		this.onDrag = this.onDrag.bind(this);
		this.onDragRgb = this.onDragRgb.bind(this);
		this.onDragCust = this.onDragCust.bind(this);
		this.handleHor = this.handleHor.bind(this);
		this.handleRGBA = this.handleRGBA.bind(this);

		// DatePicker
		this.handleDefault = this.handleDefault.bind(this);
		this.handleAutoClose = this.handleAutoClose.bind(this);
		this.handleStart = this.handleStart.bind(this);
		this.handleEnd = this.handleEnd.bind(this);
		this.handleMonthChange = this.handleMonthChange.bind(this);
		this.handleYearChange = this.handleYearChange.bind(this);

		// Bootsrap Maxlength
		this.threshholdchange = this.threshholdchange.bind(this);
		this.threshholdDefault = this.threshholdDefault.bind(this);
		this.optionchange = this.optionchange.bind(this);
		this.placementchange = this.placementchange.bind(this);
		this.textareachange = this.textareachange.bind(this);

		this.handleSelectGroup = this.handleSelectGroup.bind(this);
		this.handleMulti = this.handleMulti.bind(this);
		this.handleMulti1 = this.handleMulti1.bind(this);
	}

	//Color Picker
	onDrag(c1) {
		this.setState({ color: c1 });
	}
	onDragRgb(c1) {
		this.setState({ colorRgb: c1 });
	}
	onDragCust(c1) {
		this.setState({ colorCust: c1 });
	}
	handleHor = color => {
		this.setState({ colorHor: color.hex });
	};
	handleRGBA = () => {
		this.setState({ display_RGBA: !this.state.display_RGBA })
	};

	onSwatchHover_RGBA = (color) => {
		const format = "rgba(" + color.rgb.r + "," + color.rgb.g + "," + color.rgb.b + "," + color.rgb.a + ")";
		this.setState({ colorRGBA: format });
	}

	//DatePicker
	handleDefault(date) {
		this.setState({ default_date: date });
	}
	handleAutoClose(date) {
		this.setState({ auto_close: date });
	}
	handleStart = (date) => {
		this.setState({ start_date: date });
	}
	handleEnd = (date) => {
		this.setState({ end_date: date });
	}
	handleMonthChange(date) {
		this.setState({ monthDate: date });
	}
	handleYearChange(date) {
		this.setState({ yearDate: date });
	}

	//Bootstrap Maxlength
	threshholdchange(event) {
		var count = event.target.value.length;
		var remain_val = this.state.max_len - 20;
		if (remain_val <= count) {
			this.setState({ disthresh: true });
		} else {
			this.setState({ disthresh: false });
		}
		this.setState({ threshholdcount: event.target.value.length });
	}

	threshholdDefault(event) {
		var count = event.target.value.length;
		if (count > 0) {
			this.setState({ disDefault: true });
		} else {
			this.setState({ disDefault: false });
		}
		this.setState({ threshholdDefault: event.target.value.length });
	}

	optionchange(event) {
		var count = event.target.value.length;
		if (count > 0) {
			this.setState({ disbadge: true });
		} else {
			this.setState({ disbadge: false });
		}
		if (count > 24) {
			this.setState({ advanceclass: "badgecountextra" });
		} else {
			this.setState({ advanceclass: "badgecount" });
		}
		this.setState({ optioncount: event.target.value.length });
	}

	placementchange(event) {
		var count = event.target.value.length;
		if (count > 0) {
			this.setState({ placementbadge: true });
		} else {
			this.setState({ placementbadge: false });
		}
		this.setState({ placementcount: event.target.value.length });
	}

	textareachange(event) {
		var count = event.target.value.length;
		if (count > 0) {
			this.setState({ textareabadge: true });
		} else {
			this.setState({ textareabadge: false });
		}
		this.setState({ textcount: event.target.value.length });
	}

	//Select
	handleSelectGroup = selectedGroup => {
		this.setState({ selectedGroup });
	};
	handleMulti = selectedMulti => {
		this.setState({ selectedMulti });
	};
	handleMulti1 = selectedMulti1 => {
		this.setState({ selectedMulti1 });
	};
	render() {
		const { selectedGroup } = this.state;
		const { selectedMulti } = this.state;
		const { selectedMulti1 } = this.state;

		function Offsymbol() {
			return (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "100%",
						fontSize: 12,
						color: "#fff",
						paddingRight: 2
					}}
				>
					{" "}
					No
				</div>
			);
		};

		function OnSymbol() {
			return (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "100%",
						fontSize: 12,
						color: "#fff",
						paddingRight: 2
					}}
				>
					{" "}
					Yes
				</div>
			);
		};

		return (
			<React.Fragment>
				<div className="page-content">
					<Container fluid>
						<Breadcrumbs title="Form Advanced" breadcrumbItems={this.state.breadcrumbItems} />

						<Row>
							<Col lg="12">
								<Card>
									<CardBody>

										<h4 className="card-title">Select2</h4>
										<p className="card-title-desc">A mobile and touch friendly input spinner component for Bootstrap</p>

										<form>
											<Row>
												<Col lg="6">
													<div className="mb-3">
														<Label className="form-label">Single Select</Label>
														<Select
															value={selectedGroup}
															onChange={this.handleSelectGroup}
															options={optionGroup}
															classNamePrefix="select2-selection"
														/>

													</div>
													<div className="mb-3">
														<Label className="form-label">Multiple Select</Label>
														<Select
															value={selectedMulti}
															isMulti={true}
															onChange={this.handleMulti}
															options={optionGroup}
															classNamePrefix="select2-selection"
														/>
													</div>
												</Col>

												<Col lg="6">
													<div className="mb-3">
														<Label className="form-label">Disable</Label>
														<Select
															value={selectedMulti1}
															isMulti={true}
															onChange={this.handleMulti1}
															options={optionGroup}
															classNamePrefix="select2-selection"
															isDisabled={true}
														/>
													</div>
												</Col>
											</Row>
										</form>
									</CardBody>
								</Card>
							</Col>
						</Row>

						<Row>
							<Col lg="6">
								<Card>
									<CardBody>

										<h4 className="card-title">React Colorpicker</h4>
										<p className="card-title-desc">Fancy and customizable colorpicker
                                            plugin for Twitter Bootstrap.</p>

										<Form action="#">
											<div className="mb-3">
												<Label className="form-label">Simple input field</Label>
												<Input
													type="text"
													className="colorpicker-default"
													value={this.state.color}
													onClick={() =>
														this.setState({
															simple_color: !this.state.simple_color
														})
													}
													readOnly
												/>
												{/* {this.state.simple_color ? (
													<ColorPicker
														saturationHeight={100}
														saturationWidth={100}
														value={this.state.color}
														onDrag={this.onDrag.bind(this)}
													/>
												) : null} */}
											</div>

											<div className="mb-3">
												<Label className="form-label">With custom options - RGBA</Label>
												<Input
													type="text"
													className="colorpicker-rgba form-control"
													value={this.state.colorRGBA}
													onClick={this.handleRGBA}
													readOnly
												/>
												{
													this.state.display_RGBA ? (
														<SketchPicker
															color="#fff"
															value={this.state.colorRGBA}
															width="160px"
															onChangeComplete={this.onSwatchHover_RGBA}
														/>
													) : null
												}
											</div>
											<FormGroup className="m-b-0">
												<Label className="form-label">As a component</Label>
												<InputGroup className="colorpicker-default" title="Using format option">
													<Input readOnly value={this.state.colorRgb} type="text" className="form-control input-lg" />
													<div className="input-group-append">
														<span
															className="input-group-text colorpicker-input-addon"
															onClick={() => this.setState({ simple_color1: !this.state.simple_color1 })}
														>
															<i style={{
																height: "16px",
																width: "16px",
																background: this.state.colorRgb
															}}></i>
														</span>
													</div>
												</InputGroup>

												{/* {this.state.simple_color1 ?
													<ColorPicker saturationHeight={100} saturationWidth={100} value={this.state.colorRgb} onDrag={this.onDragRgb.bind(this)} />
													: null} */}
											</FormGroup>
											<div className="mb-3">
												<Label className="form-label">Horizontal mode</Label>
												<Input
													type="text"
													onClick={() =>
														this.setState({
															simple_color2: !this.state.simple_color2
														})
													}
													value={this.state.colorHor}
													readOnly
												/>
												{this.state.simple_color2 ? (
													<SketchPicker
														color="#fff"
														value={this.state.simple_color2}
														width="160px"
														onChangeComplete={this.handleHor}
													/>
												) : null}
											</div>

											<FormGroup className="mb-0">
												<Label className="form-label">Inline</Label>


												{/* <ColorPicker
													saturationHeight={100}
													saturationWidth={100}
													value={this.state.colorCust}
													onDrag={this.onDragCust.bind(this)}
												/> */}
											</FormGroup>
										</Form>
									</CardBody>
								</Card>

							</Col>
							<Col lg="6">
                <Card>
                  <CardBody>
                    <h4 className="card-title">FaltePicker</h4>
                    <p className="card-title-desc">
                      Examples of twitter bootstrap datepicker.
                    </p>

                    <Form>
                      <FormGroup className="mb-4">
                        <Label>Default Functionality</Label>
                        <InputGroup>
                          <Flatpickr
                            className="form-control d-block"
                            placeholder="dd M,yyyy"
                            options={{
                              altInput: true,
                              altFormat: "F j, Y",
                              dateFormat: "Y-m-d"
                            }}
                          />
                        </InputGroup>
                      </FormGroup>

                      <div className="form-group mb-4">
                        <label>Auto Close</label>
                        <div className="input-group">
                          <Flatpickr
                            className="form-control d-block"
                            placeholder="dd M,yyyy"
                            options={{
                              altInput: true,
                              altFormat: "F j, Y",
                              dateFormat: "Y-m-d"
                            }}
                          />
                        </div>
                      </div>

                      <div className="form-group mb-4">
                        <label>Multiple Date</label>
                        <div className="input-group">
                          <Flatpickr
                            className="form-control d-block"
                            placeholder="dd M,yyyy"
                            options={{
                              mode: "multiple",
                              dateFormat: "Y-m-d"
                            }}
                          />
                        </div>
                      </div>
                      <FormGroup className="mb-4">
                        <Label>Date Range</Label>
                        <InputGroup>
                          <Flatpickr
                            className="form-control d-block"
                            placeholder="dd M,yyyy"
                            options={{
                              mode: "range",
                              dateFormat: "Y-m-d"
                            }}
                          />
                        </InputGroup>
                      </FormGroup>
                      <div className="form-group mb-0">
                        <label>Inline Datepicker</label>
                        <Flatpickr
                          className="form-control d-block"
                          placeholder="dd M,yyyy"
                          options={{
                            inline: true,
                            altInput: true,
                            altFormat: "F j, Y",
                            dateFormat: "Y-m-d"
                          }}
                        />
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
						</Row>
						<Row>
							<Col lg="6">
								<Card>
									<CardBody>

										<h4 className="card-title">Bootstrap MaxLength</h4>
										<p className="card-title-desc">This plugin integrates by default with
										Twitter bootstrap using badges to display the maximum lenght of the
                                            field where the user is inserting text. </p>
										<Label className="form-label">Default usage</Label>
										<p className="text-muted m-b-15">
											The badge will show up by default when the remaining chars
											are 10 or less:
										</p>
										<Input
											type="text"
											maxLength="25"
											name="defaultconfig"
											onChange={this.threshholdDefault}
											id="defaultconfig"
										/>

										<div className="mt-3">
											<Label className="form-label">Threshold value</Label>
											<p className="text-muted m-b-15">
												Do you want the badge to show up when there are 20 chars
												or less? Use the <code>threshold</code> option:
											</p>
											<Input
												type="text"
												maxLength={this.state.max_len}
												onChange={this.threshholdchange}
												name="thresholdconfig"
												id="thresholdconfig"
											/>
											{this.state.disthresh ? (
												<span className="badgecount badge badge-info">
													{this.state.threshholdcount} / 25{" "}
												</span>
											) : null}
										</div>

										<div className="mt-3">
											<Label className="form-label">All the options</Label>
											<p className="text-muted m-b-15">
												Please note: if the <code>alwaysShow</code> option isenabled, the <code>threshold</code> option is ignored.
                      						</p>
											<Input
												type="text"
												maxLength="25"
												onChange={this.optionchange}
												name="alloptions"
												id="alloptions"
											/>
											{this.state.disbadge ? (
												<span className="badgecount">
													<span className="badge badge-success">You Typed {this.state.optioncount} out of 25 chars available.</span>
												</span>
											) : null}
										</div>

										<div className="mt-3">
											<Label className="form-label">Position</Label>
											<p className="text-muted m-b-15">
												All you need to do is specify the <code>placement</code>{" "}
												option, with one of those strings. If none is specified,
												the positioning will be defauted to 'bottom'.
											</p>
											<Input
												type="text"
												maxLength="25"
												onChange={this.placementchange}
												name="placement"
												id="placement"
											/>
											{this.state.placementbadge ? (
												<span style={{ float: "right" }} className="badgecount badge badge-info">
													{this.state.placementcount} / 25{" "}
												</span>
											) : null}
										</div>

										<div className="mt-3">
											<Label className="form-label">Textarea</Label>
											<p className="text-muted m-b-15">
												Bootstrap maxlength supports textarea as well as inputs.
												Even on old IE.
                      						</p>
											<Input
												type="textarea"
												id="textarea"
												onChange={this.textareachange}
												maxLength="225"
												rows="3"
												placeholder="This textarea has a limit of 225 chars."
											/>
											{this.state.textareabadge ? (
												<span className="badgecount badge badge-info">
													{" "}
													{this.state.textcount} / 225{" "}
												</span>
											) : null}
										</div>
									</CardBody>
								</Card>
							</Col>

							<Col lg="6">
                <Card>
                  <CardBody>
                    <h4 className="card-title">Bootstrap TouchSpin</h4>
                    <p className="card-title-desc">
                      A mobile and touch friendly input spinner component for
                      Bootstrap
                    </p>
                    <Form>
                      <FormGroup className="mb-3">
                        <Label>Using data attributes</Label>
                        <InputGroup>
                          <div
                            className="input-group-append"
                            onClick={() =>
                              this.setState({
                                data_attr: this.state.data_attr - 1
                              })
                            }
                          >
                            <Button type="button" color="primary">
                              <i className="mdi mdi-minus" />
                            </Button>
                          </div>
                          <input
                            type="number"
                            className="form-control"
                            value={this.state.data_attr}
                            placeholder="number"
                            readOnly
                          />
                          <div
                            className="input-group-append"
                            onClick={() =>
                              this.setState({
                                data_attr: this.state.data_attr + 1
                              })
                            }
                          >
                            <Button type="button" color="primary">
                              <i className="mdi mdi-plus" />
                            </Button>
                          </div>
                        </InputGroup>
                      </FormGroup>
                      <FormGroup className="mb-3">
                        <Label>Example with postfix (large)</Label>
                        <InputGroup>
                          <span
                            className="input-group-btn input-group-prepend"
                            onClick={() =>
                              this.setState({ postfix: this.state.postfix - 1 })
                            }
                          >
                            <Button type="button" color="primary">
                              <i className="mdi mdi-minus" />
                            </Button>
                          </span>
                          <input
                            type="number"
                            className="form-control"
                            value={this.state.postfix}
                            placeholder="number"
                            readOnly
                          />
                          <span className="input-group-append">
                            <span className="input-group-text">%</span>
                          </span>
                          <span className="input-group-append">
                            <Button
                              type="button"
                              onClick={() =>
                                this.setState({
                                  postfix: this.state.postfix + 1
                                })
                              }
                              color="primary"
                            >
                              <i className="mdi mdi-plus" />
                            </Button>
                          </span>
                        </InputGroup>
                      </FormGroup>
                      <FormGroup className="mb-3">
                        <Label>With prefix</Label>
                        <InputGroup>
                          <span
                            className="input-group-btn input-group-prepend"
                            onClick={() =>
                              this.setState({ postfix1: this.state.postfix1 - 1 })
                            }
                          >
                            <Button type="button" color="primary">
                              <i className="mdi mdi-minus" />
                            </Button>
                          </span>
                          <span className="input-group-append">
                            <span className="input-group-text">$</span>
                          </span>
                          <input
                            type="number"
                            className="form-control"
                            value={this.state.postfix1}
                            placeholder="number"
                            readOnly
                          />

                          <span className="input-group-append">
                            <Button
                              type="button"
                              onClick={() =>
                                this.setState({
                                  postfix1: this.state.postfix1 + 1
                                })
                              }
                              color="primary"
                            >
                              <i className="mdi mdi-plus" />
                            </Button>
                          </span>
                        </InputGroup>
                      </FormGroup>
                      <FormGroup className="mb-3">
                        <Label>Init with empty value:</Label>
                        <InputGroup>
                          <span
                            className="input-group-btn input-group-append"
                            onClick={() =>
                              this.setState({
                                empty_val: this.state.empty_val - 1
                              })
                            }
                          >
                            <Button type="button" color="primary">
                              <i className="mdi mdi-minus" />
                            </Button>
                          </span>
                          <input
                            type="number"
                            className="form-control"
                            value={this.state.empty_val}
                            placeholder="number"
                            readOnly
                          />
                          <span
                            className="input-group-append"
                            onClick={() =>
                              this.setState({
                                empty_val: this.state.empty_val + 1
                              })
                            }
                          >
                            <Button type="button" color="primary">
                              <i className="mdi mdi-plus" />
                            </Button>
                          </span>
                        </InputGroup>
                      </FormGroup>
                      <FormGroup className="mb-3">
                        <Label>
                          Value attribute is not set (applying settings.initval)
                        </Label>
                        <InputGroup>
                          <div
                            className="input-group-append"
                            onClick={() =>
                              this.setState({
                                not_attr: this.state.not_attr - 1
                              })
                            }
                          >
                            <Button type="button" color="primary">
                              <i className="mdi mdi-minus" />
                            </Button>
                          </div>
                          <input
                            type="number"
                            className="form-control"
                            value={this.state.not_attr}
                            placeholder="number"
                            readOnly
                          />
                          <div
                            className="input-group-append"
                            onClick={() =>
                              this.setState({
                                not_attr: this.state.not_attr + 1
                              })
                            }
                          >
                            <Button type="button" color="primary">
                              <i className="mdi mdi-plus" />
                            </Button>
                          </div>
                        </InputGroup>
                      </FormGroup>
                      <FormGroup className="mb-0">
                        <Label>
                          Value is set explicitly to 33 (skipping
                          settings.initval)
                        </Label>
                        <InputGroup>
                          <div
                            className="input-group-append"
                            onClick={() =>
                              this.setState({
                                explicit_val: this.state.explicit_val - 1
                              })
                            }
                          >
                            <Button type="button" color="primary">
                              <i className="mdi mdi-minus" />
                            </Button>
                          </div>
                          <input
                            type="number"
                            className="form-control"
                            value={this.state.explicit_val}
                            placeholder="number"
                            readOnly
                          />
                          <div
                            className="input-group-append"
                            onClick={() =>
                              this.setState({
                                explicit_val: this.state.explicit_val + 1
                              })
                            }
                          >
                            <Button type="button" color="primary">
                              <i className="mdi mdi-plus" />
                            </Button>
                          </div>
                        </InputGroup>
                      </FormGroup>
                    </Form>{" "}
                  </CardBody>
                </Card>
              </Col>
			  </Row>


			  <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <h4 className="card-title">Css Switch</h4>
                    <p className="card-title-desc">
                      Here are a few types of switches.{" "}
                    </p>

                    <Row>
                      <Col lg="6">
                        <h5 className="font-size-14 mb-3">Example switch</h5>
                        <div>
                          <Switch
                            uncheckedIcon={<Offsymbol />}
                            className="me-1 mb-sm-8 mb-2"
                            checkedIcon={<OnSymbol />}
                            onColor="#626ed4"
                            onChange={() =>
                              this.setState({ switch1: !this.state.switch1 })
                            }
                            checked={this.state.switch1}
                          />
                          <Switch
                            uncheckedIcon={<Offsymbol />}
                            className="me-1 mb-sm-8 mb-2"
                            checkedIcon={<OnSymbol />}
                            onColor="#a2a2a2"
                            onChange={() =>
                              this.setState({ switch2: !this.state.switch2 })
                            }
                            checked={this.state.switch2}
                          />
                          <Switch
                            uncheckedIcon={<Offsymbol />}
                            checkedIcon={<OnSymbol />}
                            className="me-1 mb-sm-8 mb-2"
                            onColor="#02a499"
                            onChange={() =>
                              this.setState({ switch3: !this.state.switch3 })
                            }
                            checked={this.state.switch3}
                          />
                          <Switch
                            uncheckedIcon={<Offsymbol />}
                            className="me-1 mb-sm-8 mb-2"
                            checkedIcon={<OnSymbol />}
                            onColor="#626ed4"
                            onChange={() =>
                              this.setState({ switch4: !this.state.switch4 })
                            }
                            checked={this.state.switch4}
                          />
                          <Switch
                            uncheckedIcon={<Offsymbol />}
                            className="me-1 mb-sm-8 mb-2"
                            checkedIcon={<OnSymbol />}
                            onColor="#02a499"
                            onChange={() =>
                              this.setState({ switch5: !this.state.switch5 })
                            }
                            checked={this.state.switch5}
                          />
                          <Switch
                            uncheckedIcon={<Offsymbol />}
                            className="me-1 mb-sm-8 mb-2"
                            checkedIcon={<OnSymbol />}
                            onColor="#38a4f8"
                            onChange={() =>
                              this.setState({ switch6: !this.state.switch6 })
                            }
                            checked={this.state.switch6}
                          />
                          <Switch
                            uncheckedIcon={<Offsymbol />}
                            checkedIcon={<OnSymbol />}
                            className="me-1 mb-sm-8 mb-2"
                            onColor="#f8b425"
                            onChange={() =>
                              this.setState({ switch7: !this.state.switch7 })
                            }
                            checked={this.state.switch7}
                          />
                          <Switch
                            uncheckedIcon={<Offsymbol />}
                            checkedIcon={<OnSymbol />}
                            className="me-1 mb-sm-8 mb-2"
                            onColor="#ec4561"
                            onChange={() =>
                              this.setState({ switch8: !this.state.switch8 })
                            }
                            checked={this.state.switch8}
                          />
                          <Switch
                            uncheckedIcon={<Offsymbol />}
                            checkedIcon={<OnSymbol />}
                            className="me-1 mb-sm-8 mb-2"
                            onColor="#2a3142"
                            onChange={() =>
                              this.setState({ switch9: !this.state.switch9 })
                            }
                            checked={this.state.switch9}
                          />
                        </div>
                      </Col>

                      <Col lg="6">
                        <div className="mt-4 mt-lg-0">
                          <h5 className="font-size-14 mb-3">Square switch</h5>
                          <div className="d-flex">
                            <div className="square-switch">
                              <input
                                type="checkbox"
                                id="square-switch1"
                                switch="none"
                                checked={this.state.sq1}
                                onChange={() =>
                                  this.setState({ sq1: !this.state.sq1 })
                                }
                              />
                              <label
                                htmlFor="square-switch1"
                                data-on-label="On"
                                data-off-label="Off"
                              />
                            </div>
                            <div className="square-switch">
                              <input
                                type="checkbox"
                                id="square-switch2"
                                switch="info"
                                checked={this.state.sq2}
                                onChange={() =>
                                  this.setState({ sq2: !this.state.sq2 })
                                }
                              />
                              <label
                                htmlFor="square-switch2"
                                data-on-label="Yes"
                                data-off-label="No"
                              />
                            </div>
                            <div className="square-switch">
                              <input
                                type="checkbox"
                                id="square-switch3"
                                switch="bool"
                                checked={this.state.sq3}
                                onChange={() =>
                                  this.setState({ sq3: !this.state.sq3 })
                                }
                              />
                              <label
                                htmlFor="square-switch3"
                                data-on-label="Yes"
                                data-off-label="No"
                              />
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>

					</Container>
				</div>
			</React.Fragment>
		);
	}
}

export default FormAdvanced;

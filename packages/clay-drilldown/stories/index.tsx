/**
 * SPDX-FileCopyrightText: © 2020 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: BSD-3-Clause
 */

import '@clayui/css/lib/css/atlas.css';
const spritemap = require('@clayui/css/lib/images/icons/icons.svg');
import ClayIcon from '@clayui/icon';
import {storiesOf} from '@storybook/react';
import React from 'react';

import ClayDrilldown from '../src';

storiesOf('Components|ClayDrilldown', module)
	.add('default', () => (
		<ClayDrilldown title="Default">
			<ClayDrilldown.Item title="One">
				<div className="drilldown-item-inner">
					<ul className="nav nav-stacked">
						<li>
							<a className="" href="#1">
								{'Folder'}
							</a>
						</li>

						<li>
							<a
								className=""
								data-drilldown="next"
								href="#documentId1"
							>
								{'Document'}
								<span className="dropdown-item-indicator-end">
									<ClayIcon
										spritemap={spritemap}
										symbol="angle-right"
									/>
								</span>
							</a>
						</li>

						<li>
							<a
								className=""
								data-drilldown="next"
								href="#shortcutId1"
							>
								{'Shortcut'}
								<span className="dropdown-item-indicator-end">
									<ClayIcon
										spritemap={spritemap}
										symbol="angle-right"
									/>
								</span>
							</a>
						</li>

						<li>
							<a className="" href="#1">
								{'Repository'}
							</a>
						</li>

						<li>
							<a
								className="disabled"
								href="#__disabled"
								tabIndex={-1}
							>
								{'Disabled'}
							</a>
						</li>
					</ul>
				</div>
			</ClayDrilldown.Item>

			<ClayDrilldown.Item title="Two">
				<div className="drilldown-item-inner">
					<div className="">
						<a
							className="component-action"
							data-drilldown="prev"
							href="#firstClayDrillDown.Item"
							role="button"
						>
							<ClayIcon
								spritemap={spritemap}
								symbol="angle-left"
							/>
						</a>

						<span className="">{'Document'}</span>
					</div>

					<ul className="">
						<li>
							<a className="" href="#1">
								{'Basic Document'}
							</a>
						</li>

						<li>
							<a
								className=""
								data-drilldown="next"
								href="#contractId1"
							>
								{'Contract'}
								<span className="dropdown-item-indicator-end">
									<ClayIcon
										spritemap={spritemap}
										symbol="angle-right"
									/>
								</span>
							</a>
						</li>

						<li>
							<a className="" href="#1">
								{'Marketing Banner'}
							</a>
						</li>

						<li>
							<a className="" href="#1">
								{'Online Training'}
							</a>
						</li>

						<li>
							<a className="" href="#1">
								{'Sales Presentation'}
							</a>
						</li>
					</ul>
				</div>
			</ClayDrilldown.Item>

			<ClayDrilldown.Item title="Three">
				<div className="drilldown-item-inner">
					<div className="">
						<a
							className="component-action"
							data-drilldown="prev"
							href="#documentId1"
							role="button"
						>
							<ClayIcon
								spritemap={spritemap}
								symbol="angle-left"
							/>
						</a>

						<span className="">{'Contract'}</span>
					</div>

					<ul className="">
						<li>
							<a className="" href="#1">
								{'Contract Document #1'}
							</a>
						</li>

						<li>
							<a className="" href="#1">
								{'Contract Document #2'}
							</a>
						</li>

						<li>
							<a className="" href="#1">
								{'Contract Document #3'}
							</a>
						</li>
					</ul>
				</div>
			</ClayDrilldown.Item>

			<ClayDrilldown.Item title="Four">
				<div className="drilldown-item-inner">
					<div className="">
						<a
							className="component-action"
							data-drilldown="prev"
							href="#firstClayDrillDown.Item"
							role="button"
						>
							<ClayIcon
								spritemap={spritemap}
								symbol="angle-left"
							/>
						</a>
						<span className="">{'Shortcut'}</span>
					</div>

					<ul className="">
						<li>
							<a className="" href="#1">
								{'Shortcut #1'}
							</a>
						</li>
						<li>
							<a className="" href="#1">
								{'Shortcut #2'}
							</a>
						</li>
						<li>
							<a className="" href="#1">
								{'Shortcut #3'}
							</a>
						</li>
					</ul>
				</div>
			</ClayDrilldown.Item>
		</ClayDrilldown>
	))
	.add('intro', () => (
		<ClayDrilldown title="Intro">
			<ClayDrilldown.Item title="One" />
			<ClayDrilldown.Item title="Two" />
			<ClayDrilldown.Item
				items={[
					{href: '#', title: 'Four'},
					{onClick: () => alert('test'), title: 'Five'},
					{items: [{href: '#', title: 'Seven'}], title: 'Six'},
				]}
				title="Three"
			/>
			<ClayDrilldown.Item title="Eight" />
		</ClayDrilldown>
	))
	.add('intro2', () => (
		<div style={{margin: '0 auto', width: 300}}>
			<ClayDrilldown
				items={[
					{href: '#', title: 'One'},
					{onClick: () => alert('test'), title: 'Two'},
					{
						items: [
							{href: '#', title: 'Four'},
							{
								items: [{title: 'Six'}, {title: 'Seven'}],
								title: 'Five',
							},
						],
						title: 'Three',
					},
				]}
				spritemap={spritemap}
				title="Intro Two"
			/>
		</div>
	));

/**
 * SPDX-FileCopyrightText: © 2020 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {ClayInputMoveBoxes} from '..';
import {cleanup, render, fireEvent} from '@testing-library/react';
import React from 'react';

const options = [
	[
		{
			label: 'Option 1',
			value: '1',
		},
		{
			label: 'Option 2',
			value: '2',
		},
		{
			label: 'Option 3',
			value: '3',
		},
	],
	[
		{
			label: 'Option 4',
			value: '4',
		},
		{
			label: 'Option 5',
			value: '5',
		},
	],
];

describe('Rendering', () => {
	afterEach(cleanup);

	it('renders ClayInputMoveBoxes', () => {
		const {container} = render(
			<ClayInputMoveBoxes
				left={{
					items: options[0],
					label: 'In Use',
					onChange: () => {},
					onSelectChange: () => {},
					selected: [''],
				}}
				right={{
					items: options[1],
					label: 'Available',
					onChange: () => {},
					onSelectChange: () => {},
					selected: [''],
				}}
				size={8}
				spritemap="/path/to/some/resource.svg"
			/>
		);

		expect(container).toMatchSnapshot();
	});
});

describe('Interactions', () => {
	const handleOnItemsChange = jest.fn();

	afterEach(() => {
		handleOnItemsChange.mockReset();

		cleanup();
	});

	it('transfers selected options from left box to the right', () => {
		const {container} = render(
			<ClayInputMoveBoxes
				left={{
					items: options[0],
					label: 'In Use',
					onChange: handleOnItemsChange,
					onSelectChange: () => {},
					selected: ['1'],
				}}
				right={{
					items: options[1],
					label: 'Available',
					onChange: handleOnItemsChange,
					onSelectChange: () => {},
					selected: [''],
				}}
				size={8}
				spritemap="/path/to/some/resource.svg"
			/>
		);

		const transferRightButton = container.querySelector(
			'.transfer-button-ltr'
		);

		fireEvent.click(transferRightButton as HTMLObjectElement, {});

		expect(handleOnItemsChange).toHaveBeenCalled();

		const rightSelectBox = container.querySelector(
			'.select-box-right'
		) as HTMLSelectElement;

		// expect(rightSelectBox.options[2].value).toBe('1');
	});
});

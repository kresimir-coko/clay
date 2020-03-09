/**
 * SPDX-FileCopyrightText: © 2020 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {ClayDualListbox} from '..';
import {cleanup, fireEvent, render} from '@testing-library/react';
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

	it('renders ClayDualListbox', () => {
		const {container} = render(
			<ClayDualListbox
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
	afterEach(cleanup);

	it("calls left box's onChange event when transfering from left to right", () => {
		const handleLeftChange = jest.fn();
		const handleRightChange = jest.fn();

		const {getByTestId} = render(
			<ClayDualListbox
				left={{
					items: options[0],
					label: 'In Use',
					onChange: handleLeftChange,
					onSelectChange: () => {},
					selected: ['2'],
				}}
				right={{
					items: options[1],
					label: 'Available',
					onChange: handleRightChange,
					onSelectChange: () => {},
					selected: [''],
				}}
				size={8}
				spritemap="/path/to/some/resource.svg"
			/>
		);

		expect(handleLeftChange).not.toHaveBeenCalled();

		fireEvent.click(getByTestId('ltr') as HTMLButtonElement, {});

		expect(handleLeftChange).toHaveBeenCalledWith([
			{
				label: 'Option 1',
				value: '1',
			},
			{
				label: 'Option 3',
				value: '3',
			},
		]);
	});

	it("calls left box's onChange event when transfering from right to left", () => {
		const handleLeftChange = jest.fn();
		const handleRightChange = jest.fn();

		const {getByTestId} = render(
			<ClayDualListbox
				left={{
					items: options[0],
					label: 'In Use',
					onChange: handleLeftChange,
					onSelectChange: () => {},
					selected: [],
				}}
				right={{
					items: options[1],
					label: 'Available',
					onChange: handleRightChange,
					onSelectChange: () => {},
					selected: ['5'],
				}}
				size={8}
				spritemap="/path/to/some/resource.svg"
			/>
		);

		expect(handleRightChange).not.toHaveBeenCalled();

		fireEvent.click(getByTestId('rtl') as HTMLButtonElement, {});

		expect(handleRightChange).toHaveBeenCalledWith([
			{
				label: 'Option 4',
				value: '4',
			},
		]);
	});
});

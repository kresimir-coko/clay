/**
 * SPDX-FileCopyrightText: © 2020 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {ClaySelectBox} from '..';
import {cleanup, fireEvent, render} from '@testing-library/react';
import React from 'react';

const options = [
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
];

describe('Rendering', () => {
	afterEach(cleanup);

	it('renders ClaySelectBox', () => {
		const {container} = render(
			<ClaySelectBox
				aria-label="Select Box Label"
				id="mySelectBoxId"
				items={options}
				onChange={() => {}}
				value={'1'}
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('renders ClaySelectBox with multiple options selected', () => {
		const {container} = render(
			<ClaySelectBox
				aria-label="Select Box Label"
				id="mySelectBoxId"
				items={options}
				multiple
				onChange={() => {}}
				value={['1', '2']}
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('renders ClaySelectBox with buttons to reorder options', () => {
		const {container} = render(
			<ClaySelectBox
				aria-label="Select Box Label"
				id="mySelectBoxId"
				items={options}
				multiple
				onChange={() => {}}
				onItemsChange={() => {}}
				showArrows
				spritemap="/path/to/some/resource.svg"
				value={['1']}
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

	it('changes order of options in ClaySelectBox when reorder up button is clicked', () => {
		const {container} = render(
			<ClaySelectBox
				aria-label="Select Box Label"
				id="mySelectBoxId"
				items={options}
				multiple
				onChange={() => {}}
				onItemsChange={handleOnItemsChange}
				showArrows
				spritemap="/path/to/some/resource.svg"
				value={['2']}
			/>
		);

		const reorderUpButton = container.querySelector(
			'.select-box-order-button-up'
		);

		fireEvent.click(reorderUpButton as HTMLButtonElement, {});

		expect(handleOnItemsChange).toHaveBeenCalled();

		expect(handleOnItemsChange.mock.calls[0][0]).toEqual([
			{label: 'Option 2', value: '2'},
			{label: 'Option 1', value: '1'},
			{label: 'Option 3', value: '3'},
		]);
	});

	it('selects multiple options', () => {
		const {container} = render(
			<ClaySelectBox
				aria-label="Select Box Label"
				id="mySelectBoxId"
				items={options}
				multiple
				onChange={() => {}}
				onItemsChange={() => {}}
				showArrows
				spritemap="/path/to/some/resource.svg"
				value={[]}
			/>
		);

		const optionElement = container.querySelector('option');

		fireEvent.change(optionElement as HTMLOptionElement, {
			target: {value: ['1', '2']},
		});

		expect(container.querySelector('select')!.value).toEqual('1,2');
	});
});

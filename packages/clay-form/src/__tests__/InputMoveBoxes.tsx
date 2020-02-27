/**
 * © 2019 Liferay, Inc. <https://liferay.com>
 *
 * SPDX-License-Identifier: BSD-3-Clause
 */

import ClayInputMoveBoxes from '..';
import {cleanup, render} from '@testing-library/react';
import React from 'react';

describe('ClayInputMoveBoxes', () => {
	afterEach(cleanup);

	it('renders', () => {
		const {container} = render(<ClayInputMoveBoxes />);

		expect(container).toMatchSnapshot();
	});
});

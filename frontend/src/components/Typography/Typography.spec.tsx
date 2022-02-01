import React from 'react';
import { render, screen } from 'test-utils';
import { TypographyTag } from './TypographyTags';

describe('Typography component', () => {
  const testText = 'test text';

  it('should display REGULAR text, if component is rendered', () => {
    // when
    render(<Typography typographyTag={TypographyTag.REGULAR}>{testText}</Typography>);

    // then
    const textComponent = screen.getByText(/test text/i);
    expect(textComponent).toBeInTheDocument();
  });

  it('should display OVERLINE text, if component is rendered', () => {
    // when
    render(<Typography typographyTag={TypographyTag.OVERLINE}>{testText}</Typography>);

    // then
    const textComponent = screen.getByText(/test text/i);
    expect(textComponent).toBeInTheDocument();
  });

  it('should display HEADING_2 text, if component is rendered', () => {
    // when
    render(<Typography typographyTag={TypographyTag.HEADING_2}>{testText}</Typography>);

    // then
    const textComponent = screen.getByRole('heading', { level: 2 });
    expect(textComponent).toHaveTextContent(/test text/i);
    expect(textComponent).toBeInTheDocument();
  });
});

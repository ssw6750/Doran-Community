// __tests__/index.test.js
import { render, screen } from "@testing-library/react";
import Home from "../pages/index";

describe("Home", () => {
  it("renders a heading", () => {
    const { container } = render(<Home />);

    const heading = screen.getByText("인기 게시판");
    
    expect(heading).toBeInTheDocument();

    // expect(container).toMatchSnapshot();
  });
});

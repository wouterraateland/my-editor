import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import IndexPage from "pages/index";
import NodePage from "pages/node";

export default () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/n/*" element={<NodePage />} />
    </Routes>
  </BrowserRouter>
);

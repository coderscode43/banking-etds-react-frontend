import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./components/component/ErrorPage";
import HomeSClayout from "./layouts/HomeSCLayout";
import Branch from "./pages/SC/Branch";
import Challan from "./pages/SC/Challan";
import CorrectionRequest from "./pages/SC/CorrectionRequest";
import DeductorDetails from "./pages/SC/DeductorDetails";
import Form24QDeductee from "./pages/SC/Form24QDeductee";
import Form26QDeductee from "./pages/SC/Form26QDeductee";
import Form27EQDeductee from "./pages/SC/Form27EQDeductee";
import Form27QDeductee from "./pages/SC/Form27QDeductee";
import Homepage from "./pages/SC/Homepage";
import Ldc from "./pages/SC/Ldc";
import Logs from "./pages/SC/Logs";
import PanUpdateDetails from "./pages/SC/PanUpdateDetails";
import RegularReturn from "./pages/SC/RegularReturn";
import StatementStatus from "./pages/SC/StatementStatus";
import TotalAmountDetails from "./pages/SC/TotalAmountDetails";
import UploadCertificate from "./pages/SC/UploadCertificate";
import UserDetails from "./pages/SC/UserDetails";

import PageNotFound from "./components/component/PageNotFound";
import HomeWOTLayout from "./layouts/HomeWOTLayout";
import CorrectionRequestWOT from "./pages/WOT/CorrectionRequest";
import DownloadCertificate from "./pages/WOT/DownloadCertificate";
import Form24QDeducteeWOT from "./pages/WOT/Form24QDeductee";
import Form26QDeducteeWOT from "./pages/WOT/Form26QDeductee";
import Form27EQDeducteeWOT from "./pages/WOT/Form27EQDeductee";
import Form27QDeducteeWOT from "./pages/WOT/Form27QDeductee";
import GenerateReport from "./pages/WOT/GenerateReport";
import RegularReturnWOT from "./pages/WOT/RegularReturn";
import DetailCorrectionRequest from "./pages/WOTDetail/DetailCorrectionRequest";
import DetailForm24QDeducteeWOT from "./pages/WOTDetail/DetailForm24QDeductee";
import DetailForm26QDeducteeWOT from "./pages/WOTDetail/DetailForm26QDeductee";
import DetailRegularReturn from "./pages/WOTDetail/DetailRegularReturn";
import DetailForm27EQDeducteeWOT from "./pages/WOTDetail/DetailForm27EQDeductee";
import DetailForm27QDeducteeWOT from "./pages/WOTDetail/DetailForm27QDeductee";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Navigate to={"/home/homepage"} replace />} />

        <Route
          path="home"
          element={<HomeSClayout />}
          errorElement={<ErrorPage />}
        >
          <Route path="homepage" element={<Homepage />} />
          <Route path="branch" element={<Branch />} />
          <Route path="form24QDeductee" element={<Form24QDeductee />} />

          <Route path="form26QDeductee" element={<Form26QDeductee />} />
          <Route path="form27EQDeductee" element={<Form27EQDeductee />} />
          <Route path="form27QDeductee" element={<Form27QDeductee />} />
          <Route path="challan" element={<Challan />} />
          <Route path="totalAmount" element={<TotalAmountDetails />} />
          <Route path="panUpdateList" element={<PanUpdateDetails />} />
          <Route path="statementStatus" element={<StatementStatus />} />
          <Route path="deductorDetails" element={<DeductorDetails />} />
          <Route path="correctionRequest" element={<CorrectionRequest />} />
          <Route path="regularReturn" element={<RegularReturn />} />
          <Route path="uploadCertificate" element={<UploadCertificate />} />
          <Route path="ldc" element={<Ldc />} />
          <Route path="userDetails" element={<UserDetails />} />
          <Route path="logs" element={<Logs />} />
        </Route>

        <Route
          path="homeWOT"
          element={<HomeWOTLayout />}
          errorElement={<ErrorPage />}
        >
          <Route path="homepage" element={<Homepage />} />
          <Route path="downloadCertificate" element={<DownloadCertificate />} />
          <Route path="form24QDeductee" element={<Form24QDeducteeWOT />} />
          <Route path="form26QDeductee" element={<Form26QDeducteeWOT />} />
          <Route path="form27EQDeductee" element={<Form27EQDeducteeWOT />} />
          <Route path="form27QDeductee" element={<Form27QDeducteeWOT />} />
          <Route path="correctionRequest" element={<CorrectionRequestWOT />} />
          <Route path="regularReturn" element={<RegularReturnWOT />} />
          <Route path="generateReport" element={<GenerateReport />} />
          <Route
            path="detailForm24QDeductee"
            element={<DetailForm24QDeducteeWOT />}
          />
          <Route
            path="detailForm26QDeductee"
            element={<DetailForm26QDeducteeWOT />}
          />
          <Route
            path="detailForm27EQDeductee"
            element={<DetailForm27EQDeducteeWOT />}
          />
          <Route
            path="detailForm27QDeductee"
            element={<DetailForm27QDeducteeWOT />}
          />
          <Route path="detailRegularReturn" element={<DetailRegularReturn />} />
          <Route
            path="detailCorrectionRequest"
            element={<DetailCorrectionRequest />}
          />
        </Route>

        {/* Catch-all route for 404s */}
        <Route path="*" element={<PageNotFound />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;

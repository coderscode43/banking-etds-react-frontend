import Branch from "@/pages/SC/Branch";
import Challan from "@/pages/SC/Challan";
import DeductorDetails from "@/pages/SC/DeductorDetails";
import Form24QDeductee from "@/pages/SC/Form24QDeductee";
import Form26QDeductee from "@/pages/SC/Form26QDeductee";
import Form27EQDeductee from "@/pages/SC/Form27EQDeductee";
import Form27QDeductee from "@/pages/SC/Form27QDeductee";
import Logs from "@/pages/SC/Logs";
import PanUpdateList from "@/pages/SC/PanUpdateList";
import RegularReturn from "@/pages/SC/RegularReturn";
import StatementStatus from "@/pages/SC/StatementStatus";
import UploadCertificate from "@/pages/SC/UploadCertificate";
import UserDetails from "@/pages/SC/UserDetails";

const AllPagesSC = {
  branch: Branch,
  form24QDeductee: Form24QDeductee,
  form26QDeductee: Form26QDeductee,
  form27EQDeductee: Form27EQDeductee,
  form27QDeductee: Form27QDeductee,
  logs: Logs,
  userDetails: UserDetails,
  uploadCertificate: UploadCertificate,
  deductorDetails: DeductorDetails,
  challan: Challan,
  panUpdateList: PanUpdateList,
  statementStatus: StatementStatus,
  regularReturn: RegularReturn,
};

export default AllPagesSC;

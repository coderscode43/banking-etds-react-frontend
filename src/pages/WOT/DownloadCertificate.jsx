import DownloadAllCertificate from "@/components/component/DownloadAllCertificate";
import DownloadCertificateMultiplePan from "@/components/component/DownloadCertificateMultiplePan";
import DownloadCertificateSinglePan from "@/components/component/DownloadCertificateSinglePan";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

const categories = [
  {
    name: "Download Certificate For Single PAN",
    title: "Form 16A/16/27D",
  },
  {
    name: "Download Certificate For Multiple PAN",
    title: "Form 16A/16/27D",
  },
  {
    name: "Download All Certificates",
    title: "Form 16A/16/27D",
  },
];

const DownloadCertificate = () => {
  return (
    <>
      <div>
        <TabGroup className="flex w-full flex-col items-center">
          <TabList className="flex w-[73.5%] justify-between rounded-md border-gray-200 bg-gray-100">
            {categories.map(({ name }) => (
              <Tab
                key={name}
                className={({ selected }) =>
                  `w-full cursor-pointer space-x-1 rounded-md border-0 px-2 py-2 font-semibold ${
                    selected
                      ? "bg-[#1d3864] text-[#fff] outline-none"
                      : "w-full text-[#1d3864] outline-none"
                  }`
                }
              >
                {name}
              </Tab>
            ))}
          </TabList>
          <TabPanels className="mt-9 w-[73.5%]">
            <TabPanel
              key={categories.name}
              className="rounded-xl bg-gray-100 shadow-sm"
            >
              <DownloadCertificateSinglePan />
            </TabPanel>

            <TabPanel
              key={categories.name}
              className="rounded-xl bg-white shadow-sm"
            >
              <DownloadCertificateMultiplePan />
            </TabPanel>

            <TabPanel
              key={categories.name}
              className="rounded-xl bg-white shadow-sm"
            >
              <DownloadAllCertificate />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </>
  );
};

export default DownloadCertificate;

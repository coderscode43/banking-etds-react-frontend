import { Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import React from "react";
import { useNavigate } from "react-router-dom";

const AddUserDetails = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="space-y-5 rounded-md p-4 text-[var(--primary-color)] shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
        <h1 className="text-2xl font-bold">Add User Details</h1>
        <div className="mt-4">
          <Field>
            <div className="mb-3 flex gap-3">
              <div className="w-full md:w-1/2">
                <Label className="font-semibold text-[var(--primary-color)]">
                  Employee Id <span className="text-red-600">*</span>
                </Label>
                <Input
                  name="employeeId"
                  id="employeeId"
                  placeholder="Employee Id"
                  className={clsx(
                    "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-none"
                  )}
                />
              </div>
              <div className="w-full md:w-1/2">
                <Label className="font-semibold text-[var(--primary-color)]">
                  Type Of User <span className="text-red-600">*</span>
                </Label>
                <select
                  name="user"
                  id="user"
                  className={clsx(
                    "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                  )}
                >
                  <option value="">Select Type Of User</option>
                  <option value="admin">Admin</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
              </div>
            </div>
          </Field>
          <div className="mt-3 flex justify-end-safe gap-3">
            <button className="cursor-pointer rounded-md bg-green-600 p-2 px-4 font-semibold text-white">
              <i className="fa-solid fa-floppy-disk"></i>&nbsp; Save
            </button>
            <button
              className="cursor-pointer rounded-md bg-red-600 p-2 px-4 font-semibold text-white"
              onClick={() => navigate(-1)}
            >
              <i className="fa-solid fa-reply-all"></i>&nbsp; Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUserDetails;

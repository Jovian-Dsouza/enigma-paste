import React from "react";
import styles from "../styles/PasteList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";

const PasteList = ({ pastes }) => {
  return (
    <div className="flex h-screen justify-center items-start py-20 px-10">
      <div className="flex justify-center items-center w-full max-w-xl">
        <table className="min-w-full ">
          <thead>
            <tr>
              <th className="py-4 px-6 pr-28 text-left text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Filename
              </th>
              <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Author
              </th>
              <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {pastes.map((item) => (
              <tr key={item.id} className="hover:bg-gray-300">
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faFileLines} />
                    <div className={styles.fileName}>{item.title}</div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-[#999]">{item.author}</div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-[#999]">{item.date}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PasteList;

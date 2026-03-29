import { Plus, Trash2, Users } from "lucide-react";

const RefereeForm = ({ data = [], onChange }) => {
  const addReferee = () => {
    onChange([
      ...data,
      {
        name: "",
        position: "",
        company: "",
        email: "",
        phone: "",
      },
    ]);
  };

  const removeReferee = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateReferee = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="items-center text-lg font-semibold text-gray-900">
            Referees
          </h3>
          <p className="text-sm text-gray-500">
            Add references who can verify your experience
          </p>
        </div>

        <button
          onClick={addReferee}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Referee
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-6 text-gray-400">
          <Users className="size-10 mx-auto mb-3" />
          <p className="text-sm font-medium">No referees added yet.</p>
          <p className="text-xs mt-1">Click "Add Referee" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((referee, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-800">Referee #{index + 1}</h4>
                <button onClick={() => removeReferee(index)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>

              <input
                type="text"
                placeholder="Full Name"
                value={referee.name || ""}
                onChange={(e) => updateReferee(index, "name", e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />

              <div className="grid sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Position / Title"
                  value={referee.position || ""}
                  onChange={(e) =>
                    updateReferee(index, "position", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={referee.company || ""}
                  onChange={(e) => updateReferee(index, "company", e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  value={referee.email || ""}
                  onChange={(e) => updateReferee(index, "email", e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={referee.phone || ""}
                  onChange={(e) => updateReferee(index, "phone", e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RefereeForm;

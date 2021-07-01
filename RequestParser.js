class ListReader {
	list = [];

	static date_regex = /(?<day>\d{2})\/(?<month>\d{2})\/(?<year>\d{4}) (?<hours>\d{2}):(?<mins>\d{2}):(?<secs>\d{2})/;

	constructor(list) {
		this.list = list;
		this.index = 0;
	}

	read_date() {
		var m = ListReader.date_regex.exec(this.read_string()).groups;

		return new Date(m.year, m.month, m.day, m.hours, m.mins, m.secs, 0);
	}

	read_string() {
		return this.list[this.index++].toString();
	}

	peek_string() {
		return this.list[this.index].toString();
	}

	read_int() {
		return parseInt(this.list[this.index++]);
	}

	peek_int() {
		return parseInt(this.list[this.index]);
	}

	read_teacher() {
		var participant = new Participant();
		participant.Name = this.read_string();
		participant.PhoneNumber = this.read_string();
		participant.EmailId = this.read_string();
		participant.DiscordId = null;

		return participant;
	}

	read_participant() {
		var participant = new Participant();
		participant.Name = this.read_string();
		participant.PhoneNumber = this.read_string();
		participant.DiscordId = this.read_string();
		participant.EmailId = null;

		return participant;
	}

	read_student_iNcHarGe() {
		var participant = new Participant();
		participant.Name = this.read_string();
		participant.PhoneNumber = this.read_string();
		participant.DiscordId = null;
		participant.EmailId = null;

		return participant;
	}

	eof() {
		return this.index >= this.list.length;
	}
}

class Registration {
	TimeStamp;
	SchoolName;
	TeacherCoordinators = [];
	StudentCoordinators = [];
	EventsRegistered = [];
}

class EventRegistration {
	Name = "";
	Participants = [];
}

class Participant {
	Name = "";
	PhoneNumber = "";
	DiscordId = "";
	EmailId = "";

	is_valid() {
		if (this.Name != null && this.Name == "")
			return false;

		if (this.PhoneNumber != null && this.PhoneNumber == "")
			return false;

		if (this.DiscordId != null && this.DiscordId == "")
			return false;

		if (this.EmailId != null && this.EmailId == "")
			return false;

		return true;
	}
}

module.exports = function parse_data(data, event_list) {
	var events = event_list || ["Castaway", "Face off", "Whose Line is it Anyway?", "5 Second Summary", "Suits", "Inside Out", "Surprise Event", "Shark Tank", "Just a Minute", "Valorant", "Happy Feet", "High School Musical"];

	var registration = new Registration();

	var reader = new ListReader(data);

	registration.TimeStamp = reader.read_date();
	registration.SchoolName = reader.read_string();

	registration.TeacherCoordinators.push(reader.read_teacher());
	registration.TeacherCoordinators.push(reader.read_teacher());

	registration.StudentCoordinators.push(reader.read_student_iNcHarGe());
	registration.StudentCoordinators.push(reader.read_student_iNcHarGe());

	var event_index = 0;
	while (!reader.eof()) {
		var number_of_participants = reader.read_int();

		if (number_of_participants != NaN && number_of_participants != 0) { //HAHAHHAHA JS GO BRRRRRRRRRRRRRR s o  m u c h  p a i n 
			var event_registration = new EventRegistration();

			event_registration.Name = events[event_index];

			for (let i = 0; i < number_of_participants; i++) {
				var p = reader.read_participant();

				if (p.is_valid()) {
					event_registration.Participants.push(p);
				}
				else {
					throw "Invalid participant";
				}
			}

			registration.EventsRegistered.push(event_registration);
		}
		else {
			while (!reader.eof() && Number.isNaN(reader.peek_int())) {
				reader.read_string();
			}
		}

		event_index += 1;
	}

	return registration;
}

//D/U
//console.log(data.length);

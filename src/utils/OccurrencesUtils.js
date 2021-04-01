import Occurrence from "../bo/Occurrence";
import {OCCURRENCE_EXPERIENCE, OCCURRENCE_QUALIFICATION} from "../components/Occurrence/occurence-type";

class OccurrencesUtils {

    static getClosestToYear(occurence1, occurence2, year) {
        let occurence = null;

        const dateControl = new Date(`${year}-12-31T23:59:59`);
        const date1 = OccurrencesUtils.getDate(occurence1);
        const date2 = OccurrencesUtils.getDate(occurence2);

        if (date1 == null || date2 == null) {
            if (date1 != null) {
                occurence = occurence1;
            }
            if (date2 != null) {
                occurence = occurence2;
            }
        } else {
            const diff1 = Math.abs(dateControl - date1);
            const diff2 = Math.abs(dateControl - date2);

            if (diff1 <= diff2) {
                occurence = occurence1;
            } else {
                occurence = occurence2;
            }
        }

        return occurence;
    }

    static getOccurrenceClosestToYear(occurrences, year) {
        return OccurrencesUtils.getOccurrenceByYear(occurrences, year);
    }


    static getOccurrenceByYear(occurrences, year) {
        let occurrence = null;

        if (occurrences.length && occurrences.length > 0) {
            for (const key in occurrences) {

                const occurrenceTargeted = occurrences[key];

                if (occurrence === null) {
                    occurrence = occurrenceTargeted;
                } else {

                    const dateControlMax = new Date(`${year}-12-31T23:59:59`);
                    const dateControlMin = new Date(`${year}-01-01T00:00:00`);
                    const dateOccurrenceTargeted = OccurrencesUtils.getDate(occurrenceTargeted);
                    const dateSelected = OccurrencesUtils.getDate(occurrence);

                    const yearSelected = eval(OccurrencesUtils.getYear(dateSelected));
                    const yearTargeted = eval(OccurrencesUtils.getYear(dateOccurrenceTargeted));

                    if (dateOccurrenceTargeted !== dateSelected) {
                        if (dateOccurrenceTargeted > dateControlMin && dateOccurrenceTargeted <= dateControlMax) {

                            // If same date
                            if (yearTargeted === yearSelected) {
                                // Take occurrence with the first date in year
                                if(dateOccurrenceTargeted < dateSelected){
                                    occurrence = occurrenceTargeted;
                                }
                            }else {
                                occurrence = occurrenceTargeted;
                            }
                        }
                    }
                }
            }
        }

        return occurrence;
    }

    static getExperienceByYear(occurrences, year) {

        let experienceOccurence = null;

        for (const key in occurrences) {

            const occurrence = occurrences[key];
            if (Occurrence.isExperience(occurrence)) {

                if (experienceOccurence == null) {
                    experienceOccurence = occurrence;
                } else {

                    const dateControl = new Date(`${year}-12-31T23:59:59`);
                    const dateOccurrence = OccurrencesUtils.getDate(occurrence);
                    const dateSelected = OccurrencesUtils.getDate(experienceOccurence);

                    if (dateOccurrence <= dateControl || dateSelected > dateControl) {

                        const dateExperience = OccurrencesUtils.getDate(experienceOccurence);
                        if (dateOccurrence > dateExperience) {

                            experienceOccurence = occurrence;

                        } else {
                            if (dateExperience > dateControl) {

                                experienceOccurence = occurrence;
                            }
                        }
                    }
                }
            }
        }

        return experienceOccurence;
    }

    static getOccurrences(occurrences) {
        const result = occurrences;
        result.sort(OccurrencesUtils.occurrenceSort);
        return result;
    }

    static getExperiences(occurrences) {
        const experinceOccurences = [];

        for (const id in occurrences) {
            const occurrence = occurrences[id];
            if (Occurrence.isExperience(occurrence)) {
                experinceOccurences.push(occurrence);
            }
        }

        experinceOccurences.sort(OccurrencesUtils.occurrenceSort);
        return experinceOccurences;
    }

    static getQualificationByYear(occurrences, year) {

        let qualificationOccurence = null;

        for (const id in occurrences) {

            const occurrence = occurrences[id];
            if (Occurrence.isQualification(occurrence)) {

                if (qualificationOccurence == null) {

                    qualificationOccurence = occurrence;

                } else {
                    const dateControl = new Date(`${year}-12-31T23:59:59`);
                    const dateOccurrence = OccurrencesUtils.getDate(occurrence);
                    const dateSelected = OccurrencesUtils.getDate(qualificationOccurence);

                    if (dateOccurrence <= dateControl || dateSelected > dateControl) {

                        const dateQualification = OccurrencesUtils.getDate(qualificationOccurence);
                        if (dateOccurrence > dateQualification) {

                            qualificationOccurence = occurrence;
                        } else {
                            if (dateQualification > dateControl) {

                                qualificationOccurence = occurrence;
                            }
                        }
                    }
                }
            }
        }

        return qualificationOccurence;
    }

    static getQualifications(occurrences) {
        const qualificationOccurences = [];

        for (const id in occurrences) {
            const occurrence = occurrences[id];
            if (Occurrence.isQualification(occurrence)) {
                qualificationOccurences.push(occurrence);
            }
        }

        qualificationOccurences.sort(OccurrencesUtils.occurrenceSort);
        return qualificationOccurences;
    }

    static occurrenceRevertSort(a, b) {
        let result = 0;

        let dateA = null;
        let dateB = null;

        if (a.dateStart) {
            dateA = a.dateStart;
        }
        if (b.dateStart) {
            dateB = b.dateStart
        }
        if (a.dateEnd) {
            dateA = a.dateEnd;
        }
        if (b.dateEnd) {
            dateB = b.dateEnd
        }

        if (dateA != null && dateB != null) {
            if (dateA < dateB) {
                result = 1;
            }

            if (dateA > dateB) {
                result = -1;
            }
        }

        if (dateA != null && dateB == null) {
            result = -1;
        }

        if (dateA == null && dateB != null) {
            result = 1;
        }

        return result;
    }

    static occurrenceSort(a, b) {
        let result = 0;

        let dateA = null;
        let dateB = null;

        if (a.dateStart) {
            dateA = a.dateStart;
        }
        if (b.dateStart) {
            dateB = b.dateStart
        }
        if (a.dateEnd) {
            dateA = a.dateEnd;
        }
        if (b.dateEnd) {
            dateB = b.dateEnd
        }

        if (dateA != null && dateB != null) {
            if (dateA < dateB) {
                result = -1;
            }

            if (dateA > dateB) {
                result = 1;
            }
        }

        if (dateA != null && dateB == null) {
            result = 1;
        }

        if (dateA == null && dateB != null) {
            result = -1;
        }

        return result;
    }

    static dateCompare(date1, date2) {

        let result = null;

        if (date1 instanceof Date && date2 instanceof Date) {
            if (date1.getTime() === date2.getTime()) {
                result = 0;
            } else if (date1.getTime() > date2.getTime()) {
                result = 1;
            }
            if (date1.getTime() < date2.getTime()) {
                result = -1;
            }
        }

        return result;
    }

    static getType(occurrence) {
        let curentType = null;

        if (Occurrence.isExperience(occurrence)) {
            curentType = OCCURRENCE_EXPERIENCE;
        } else if (Occurrence.isQualification(occurrence)) {
            curentType = OCCURRENCE_QUALIFICATION;
        }

        return curentType;
    }

    static getDate(occurrence) {

        let date = null;

        if (occurrence !== undefined && occurrence !== null) {
            const {dateStart, dateEnd} = occurrence;

            // Occurrence Type : Experience or Qualification
            const type = OccurrencesUtils.getType(occurrence);

            // If Expérience
            if (type === OCCURRENCE_EXPERIENCE) {

                if (dateStart !== undefined && dateStart !== null) {
                    date = new Date(dateStart);
                }

            }
            // If Qualification
            else if (type === OCCURRENCE_QUALIFICATION) {
                if (dateStart !== undefined && dateStart !== null) {
                    date = new Date(dateStart);
                }

                if (dateEnd !== undefined && dateEnd !== null) {
                    date = new Date(dateEnd);
                }
            }

        }

        return date;
    }

    static getYear(date) {
        return date.getFullYear();
    }
}

export default OccurrencesUtils;